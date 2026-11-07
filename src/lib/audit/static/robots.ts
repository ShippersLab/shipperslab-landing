export interface RobotsRule {
  allow: boolean;
  pattern: string;
}

export interface RobotsParse {
  rules: RobotsRule[];
  sitemaps: string[];
}

export function parseRobotsTxt(text: string): RobotsParse {
  const sitemaps: string[] = [];
  const groups: Array<{ agents: string[]; rules: RobotsRule[] }> = [];
  let current: { agents: string[]; rules: RobotsRule[] } | null = null;
  let lastWasAgent = false;

  for (const rawLine of text.split(/\r?\n/).slice(0, 5000)) {
    const line = rawLine.replace(/#.*/, "").trim();
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === "sitemap") {
      if (value) sitemaps.push(value);
      continue;
    }
    if (field === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if ((field === "allow" || field === "disallow") && current && value !== "") {
      current.rules.push({ allow: field === "allow", pattern: value });
    }
  }

  const specific = groups.filter((group) => group.agents.includes("googlebot"));
  const fallback = groups.filter((group) => group.agents.includes("*"));
  const chosen = specific.length > 0 ? specific : fallback;
  return { rules: chosen.flatMap((group) => group.rules), sitemaps };
}

function patternToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  const anchored = escaped.endsWith("\\$") ? `${escaped.slice(0, -2)}$` : escaped;
  return new RegExp(`^${anchored}`);
}

export function evaluateRobots(
  parsed: RobotsParse,
  pathWithQuery: string,
): { disallowed: boolean; matchedRule: string | null } {
  let best: RobotsRule | null = null;
  for (const rule of parsed.rules) {
    if (!patternToRegExp(rule.pattern).test(pathWithQuery)) continue;
    const longer = !best || rule.pattern.length > best.pattern.length;
    const tieAllow = best && rule.pattern.length === best.pattern.length && rule.allow;
    if (longer || tieAllow) best = rule;
  }
  if (!best) return { disallowed: false, matchedRule: null };
  return {
    disallowed: !best.allow,
    matchedRule: `${best.allow ? "Allow" : "Disallow"}: ${best.pattern}`,
  };
}
