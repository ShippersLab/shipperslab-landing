import { resolve4, resolve6, resolveMx } from "node:dns/promises";

const DNS_TIMEOUT_MS = 2500;

const BLOCKED_DOMAINS = [
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "test.test",
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "throwawaymail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
];

const MISSING_CODES = new Set(["ENOTFOUND", "ENODATA"]);

type Lookup = "found" | "missing" | "unknown";

function withTimeout<T>(promise: Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("DNS timeout")), DNS_TIMEOUT_MS);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

async function lookup(query: () => Promise<unknown[]>): Promise<Lookup> {
  try {
    const records = await withTimeout(query());
    return records.length > 0 ? "found" : "missing";
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code && MISSING_CODES.has(code) ? "missing" : "unknown";
  }
}

function readDomain(email: string) {
  return email.slice(email.lastIndexOf("@") + 1).toLowerCase();
}

function isBlocked(domain: string) {
  return BLOCKED_DOMAINS.some((blocked) => domain === blocked || domain.endsWith(`.${blocked}`));
}

export async function isDeliverableEmail(email: string) {
  const domain = readDomain(email);

  if (isBlocked(domain)) {
    return false;
  }

  const mx = await lookup(async () => {
    const records = await resolveMx(domain);
    return records.filter((record) => record.exchange && record.exchange !== ".");
  });

  if (mx !== "missing") {
    return true;
  }

  const results = await Promise.all([
    lookup(() => resolve4(domain)),
    lookup(() => resolve6(domain)),
  ]);

  return results.some((result) => result !== "missing");
}
