import { lookup } from "node:dns/promises";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import puppeteer, { type Browser } from "puppeteer-core";
import { createPinnedFetch } from "@/lib/audit/net/pinned-fetch";
import type { FetchLike } from "@/lib/audit/net/safe-fetch";
import type { ResolveDns } from "@/lib/audit/security/assert-public";
import type { TestException } from "@/lib/audit/security/url";

export interface AuditEnv {
  browserWsEndpoint?: string;
  pagespeedApiKey?: string;
}

export interface AuditDeps {
  fetch: FetchLike;
  resolveDns: ResolveDns;
  connectBrowser: (endpoint: string) => Promise<Browser>;
  loadAxeSource: () => Promise<string>;
  env: AuditEnv;
  now: () => number;
  testException?: TestException;
}

async function defaultResolveDns(hostname: string): Promise<string[]> {
  const results = await lookup(hostname, { all: true, verbatim: true });
  return results.map((entry) => entry.address);
}

async function defaultLoadAxeSource(): Promise<string> {
  const requireFromProject = createRequire(join(process.cwd(), "package.json"));
  const axePath = requireFromProject.resolve("axe-core/axe.min.js");
  return readFile(axePath, "utf8");
}

export function createDefaultDeps(overrides: Partial<AuditDeps> = {}): AuditDeps {
  return {
    fetch: createPinnedFetch(),
    resolveDns: defaultResolveDns,
    connectBrowser: (endpoint) => puppeteer.connect({ browserWSEndpoint: endpoint }),
    loadAxeSource: defaultLoadAxeSource,
    env: {
      browserWsEndpoint: process.env.BROWSER_WS_ENDPOINT || undefined,
      pagespeedApiKey: process.env.PAGESPEED_API_KEY || undefined,
    },
    now: () => Date.now(),
    ...overrides,
  };
}
