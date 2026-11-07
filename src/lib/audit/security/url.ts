import { endsInNumber, isPublicAddress, parseIpv6, parseLooseIpv4 } from "@/lib/audit/security/ip";
import type { RejectionCode } from "@/lib/audit/types/common";

export interface TestException {
  allowLoopback: true;
  allowedPorts: readonly number[];
}

export class UrlRejectedError extends Error {
  readonly code: RejectionCode;
  constructor(code: RejectionCode, message: string) {
    super(message);
    this.name = "UrlRejectedError";
    this.code = code;
  }
}

const MAX_URL_LENGTH = 2048;
const ALLOWED_PORTS: readonly number[] = [80, 443];
const BLOCKED_SUFFIXES: readonly string[] = [
  ".localhost",
  ".local",
  ".internal",
  ".localdomain",
  ".home.arpa",
  ".lan",
  ".corp",
  ".intranet",
];

function reject(code: RejectionCode, message: string): never {
  throw new UrlRejectedError(code, message);
}

function addSchemeIfMissing(input: string): string {
  if (input.includes("://")) return input;
  if (/^[a-z][a-z0-9+.-]*:(?!\d)/i.test(input)) return input;
  return `https://${input}`;
}

function hasForbiddenCharacters(value: string): boolean {
  return [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 0x1f || code === 0x7f || character === "\\" || /\s/.test(character);
  });
}

export function parseAuditUrl(raw: string, exception?: TestException): URL {
  if (typeof raw !== "string") reject("invalid_url", "La URL no es un texto.");
  const trimmed = raw.trim();
  if (trimmed === "") reject("invalid_url", "La URL está vacía.");
  if (trimmed.length > MAX_URL_LENGTH) reject("invalid_url", "La URL es demasiado larga.");
  if (hasForbiddenCharacters(trimmed)) {
    reject("invalid_url", "La URL tiene caracteres no permitidos.");
  }

  let url: URL;
  try {
    url = new URL(addSchemeIfMissing(trimmed));
  } catch {
    return reject("invalid_url", "La URL no se puede interpretar.");
  }
  return assertAllowedUrl(url, exception);
}

export function assertAllowedUrl(url: URL, exception?: TestException): URL {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    reject("unsupported_scheme", "Solo se aceptan URLs http o https.");
  }
  if (url.username !== "" || url.password !== "") {
    reject("credentials_in_url", "La URL no puede incluir usuario ni contraseña.");
  }
  if (url.port !== "") {
    const port = Number.parseInt(url.port, 10);
    const allowed = ALLOWED_PORTS.includes(port) || exception?.allowedPorts.includes(port);
    if (!allowed) reject("port_not_allowed", "Solo se aceptan los puertos 80 y 443.");
  }
  assertAllowedHostname(url.hostname, exception);
  url.hash = "";
  return url;
}

function stripBrackets(hostname: string): string {
  return hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
}

export function assertAllowedHostname(hostname: string, exception?: TestException): void {
  const host = stripBrackets(hostname.toLowerCase()).replace(/\.$/, "");
  if (host === "") reject("invalid_url", "La URL no tiene host.");

  const v6 = parseIpv6(host);
  if (v6 !== null) {
    if (exception?.allowLoopback && host === "::1") return;
    if (!isPublicAddress(host)) reject("private_address", "La dirección IP no es pública.");
    return;
  }

  if (endsInNumber(host)) {
    const value = parseLooseIpv4(host);
    if (value === null) reject("invalid_url", "El host numérico no es válido.");
    const dotted = [24, 16, 8, 0].map((shift) => (value >>> shift) & 0xff).join(".");
    if (exception?.allowLoopback && dotted.startsWith("127.")) return;
    if (!isPublicAddress(dotted)) reject("private_address", "La dirección IP no es pública.");
    return;
  }

  if (host === "localhost" || BLOCKED_SUFFIXES.some((suffix) => host.endsWith(suffix))) {
    reject("blocked_hostname", "Ese nombre de host no es público.");
  }
  if (!host.includes(".")) reject("blocked_hostname", "El host no es un dominio público.");
}

export function isLoopbackLiteral(hostname: string): boolean {
  const host = stripBrackets(hostname.toLowerCase());
  return host === "::1" || /^127\.\d+\.\d+\.\d+$/.test(host);
}
