import { checkLinks } from "@/lib/audit/build/links";
import type { BrowserPhase } from "@/lib/audit/browser/session";
import type { StaticPhase } from "@/lib/audit/static/collect";
import type { AuditDeps } from "@/lib/audit/deps";
import type { SectionOutcome } from "@/lib/audit/sections/run-section";
import type { Limits } from "@/lib/audit/types/common";
import type { PageLink } from "@/lib/audit/types/viewport";
import type { TechnicalData, TechnicalViewportData } from "@/lib/audit/types/technical";

export const TECHNICAL_SOURCES = [
  "Fetch propio con redirecciones manuales validadas",
  "Chromium remoto vía puppeteer-core (eventos de página y red)",
];

function schemeOf(url: string): "http" | "https" {
  return url.startsWith("http://") ? "http" : "https";
}

export async function buildTechnical(
  requested: URL,
  staticPhase: StaticPhase,
  browser: BrowserPhase | { error: { reasonCode: string; reason: string } },
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<SectionOutcome<TechnicalData>> {
  const notes: string[] = [];
  const page = staticPhase.page;
  const viewports: TechnicalViewportData[] = [];
  let pageLinks: PageLink[] = [];
  let browserBlocked: string | null = null;

  if ("error" in browser) {
    notes.push(`Navegador no disponible: ${browser.error.reason}`);
  } else if (!browser.configured) {
    notes.push(
      "Navegador no configurado (BROWSER_WS_ENDPOINT). No se midieron errores de JavaScript ni recursos.",
    );
  } else {
    for (const outcome of browser.outcomes) {
      if (!outcome.ok) {
        notes.push(`Viewport ${outcome.viewport}: ${outcome.reason}`);
        continue;
      }
      const capture = outcome.capture;
      browserBlocked = browserBlocked ?? capture.blockedBy;
      viewports.push({
        viewport: capture.viewport,
        finalUrl: capture.finalUrl,
        httpStatus: capture.httpStatus,
        jsErrors: capture.jsErrors,
        jsErrorCount: capture.jsErrorCount,
        failedResources: capture.network.failedResources,
        failedResourceCount: capture.network.failedResourceCount,
        policyBlocked: capture.network.policyBlocked,
        policyBlockedCount: capture.network.policyBlockedCount,
        requests: capture.network.requests,
        transferredBytes: capture.network.transferredBytes,
        budgetExceeded: capture.network.budgetExceeded,
        navigationError: capture.navigationError,
      });
      if (capture.dom.status === "ok" && pageLinks.length === 0)
        pageLinks = capture.dom.value.links;
    }
  }

  if (!page.ok && viewports.length === 0) {
    return { status: "error", data: null, reasonCode: page.reasonCode, reason: page.reason, notes };
  }
  if ((page.ok && page.page.blockedBy) || browserBlocked) {
    return {
      status: "blocked",
      data: null,
      reasonCode: "blocked_by_site",
      reason:
        "El sitio mostró un control antibot o captcha. Queda como no evaluable y no se intentó sortearlo.",
      notes,
    };
  }

  const sampleMethod =
    "Primeros enlaces http(s) únicos en orden del DOM, hasta el máximo configurado";
  let sampled: TechnicalData["links"]["sampled"] = [];
  if (pageLinks.length === 0)
    notes.push("No hubo DOM renderizado para extraer enlaces; no se muestrearon enlaces.");
  else sampled = await checkLinks(pageLinks, deps, limits, signal);

  const data: TechnicalData = {
    requestedUrl: requested.toString(),
    finalUrl: page.ok ? page.page.finalUrl : null,
    scheme: schemeOf(requested.toString()),
    finalScheme: page.ok ? schemeOf(page.page.finalUrl) : null,
    status: page.ok ? page.page.status : null,
    contentType: page.ok ? page.page.contentType : null,
    redirects: page.ok ? page.page.hops : [],
    redirectCount: page.ok ? page.page.hops.length : 0,
    responseTimeMs: page.ok ? page.page.responseTimeMs : null,
    protocolProbe: staticPhase.protocolProbe,
    viewports,
    links: { sampleMethod, uniqueFound: pageLinks.length, sampled },
  };
  if (!page.ok) notes.push(`Fetch propio falló: ${page.reason}`);
  return { status: "ok", data, notes };
}
