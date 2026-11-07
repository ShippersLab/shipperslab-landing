import type { Page } from "puppeteer-core";
import type { AxeSummary } from "@/lib/audit/types/viewport";

interface AxeNode {
  target: unknown[];
  html: string;
  failureSummary?: string;
}

interface AxeRule {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
}

interface AxeRunResult {
  violations: AxeRule[];
  incomplete: AxeRule[];
}

const AXE_RUN_SCRIPT = `(async () => {
  const result = await window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    resultTypes: ['violations', 'incomplete'],
    reporter: 'v2'
  });
  return JSON.stringify({
    violations: result.violations,
    incomplete: result.incomplete.map(function (r) { return { id: r.id, nodes: [] }; })
  });
})()`;

export async function runAxe(
  page: Page,
  axeSource: string,
  sampleLimit: number,
): Promise<AxeSummary> {
  await page.evaluate(axeSource);
  const version = (await page.evaluate("window.axe && window.axe.version")) as string | null;
  if (!version) throw new Error("axe-core no quedó disponible en la página");
  const raw = (await page.evaluate(AXE_RUN_SCRIPT)) as string;
  const result = JSON.parse(raw) as AxeRunResult;
  const violations = result.violations.slice(0, 40).map((rule) => ({
    id: rule.id,
    impact: rule.impact,
    help: rule.help,
    helpUrl: rule.helpUrl,
    nodeCount: rule.nodes.length,
    samples: rule.nodes.slice(0, sampleLimit).map((node) => ({
      selector: node.target.map((part) => String(part)).join(" "),
      html: node.html.slice(0, 240),
      summary: (node.failureSummary ?? "").slice(0, 300),
    })),
  }));
  return {
    version,
    violations,
    violationCount: result.violations.length,
    incompleteCount: result.incomplete.length,
  };
}
