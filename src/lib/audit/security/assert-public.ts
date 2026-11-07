import { isPublicAddress } from "@/lib/audit/security/ip";
import {
  UrlRejectedError,
  assertAllowedUrl,
  isLoopbackLiteral,
  type TestException,
} from "@/lib/audit/security/url";

export type ResolveDns = (hostname: string) => Promise<string[]>;

export interface HostPolicy {
  resolveDns: ResolveDns;
  testException?: TestException;
}

export async function assertPublicHost(hostname: string, policy: HostPolicy): Promise<string[]> {
  const host = hostname.startsWith("[") ? hostname.slice(1, -1) : hostname;
  if (policy.testException?.allowLoopback && isLoopbackLiteral(host)) return [host];

  let addresses: string[];
  try {
    addresses = await policy.resolveDns(host);
  } catch {
    throw new UrlRejectedError("dns_failed", "No se pudo resolver el dominio.");
  }
  if (addresses.length === 0) {
    throw new UrlRejectedError("dns_no_addresses", "El dominio no tiene direcciones.");
  }
  if (!addresses.every((address) => isPublicAddress(address))) {
    throw new UrlRejectedError(
      "private_address",
      "El dominio resuelve a una dirección que no es pública.",
    );
  }
  return addresses;
}

export async function assertPublicUrl(url: URL, policy: HostPolicy): Promise<URL> {
  assertAllowedUrl(url, policy.testException);
  await assertPublicHost(url.hostname, policy);
  return url;
}
