const MARKER_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/cf-chl-|challenge-platform|cf-turnstile/i, "cloudflare_challenge"],
  [/g-recaptcha|recaptcha\/api|hcaptcha\.com|h-captcha|px-captcha|geetest/i, "captcha"],
  [/datadome|captcha-delivery\.com/i, "datadome"],
];

const HEADLINE_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/just a moment|checking your browser|un momento/i, "cloudflare_challenge"],
  [/pardon our interruption|attention required|access denied/i, "bot_protection"],
  [
    /verifying you are human|verify you are human|are you a robot|unusual traffic|captcha/i,
    "human_verification",
  ],
];

export interface BlockProbe {
  status: number | null;
  headers: { get(name: string): string | null } | null;
  title?: string;
  text?: string;
  html?: string;
}

export function detectBlock(probe: BlockProbe): string | null {
  const mitigated = probe.headers?.get("cf-mitigated");
  if (mitigated && /challenge/i.test(mitigated)) return "cloudflare_challenge";

  const challengeStatus = probe.status === 403 || probe.status === 429 || probe.status === 503;
  const bodyLength = (probe.text ?? probe.html ?? "").length;
  const headline = `${probe.title ?? ""}\n${(probe.text ?? "").slice(0, 600)}`;

  if (bodyLength < 8000) {
    for (const [pattern, label] of HEADLINE_PATTERNS) {
      if (
        pattern.test(headline) &&
        (challengeStatus || probe.status === 200 || probe.status === null)
      ) {
        return label;
      }
    }
  }
  if (challengeStatus) {
    const markup = (probe.html ?? "").slice(0, 40000);
    for (const [pattern, label] of MARKER_PATTERNS) {
      if (pattern.test(markup)) return label;
    }
  }
  if (probe.status === 429) return "rate_limited";
  return null;
}
