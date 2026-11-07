import type { Measured } from "@/lib/audit/types/common";

export type ViewportName = "mobile" | "desktop";

export interface ScreenshotRef {
  kind: "fold" | "full";
  fileName: string;
  mimeType: string;
  width: number;
  height: number;
  bytes: number;
  clippedFullPage: boolean;
}

export interface JsError {
  kind: "pageerror" | "console";
  message: string;
  location: string | null;
}

export interface FailedResource {
  url: string;
  resourceType: string;
  failure: "http_error" | "request_failed";
  status: number | null;
  errorText: string | null;
}

export interface PolicyBlockedRequest {
  url: string;
  resourceType: string;
  method: string;
  reasonCode: string;
}

export interface NetworkSummary {
  requests: number;
  transferredBytes: number;
  failedResources: FailedResource[];
  failedResourceCount: number;
  policyBlocked: PolicyBlockedRequest[];
  policyBlockedCount: number;
  budgetExceeded: boolean;
}

export interface DomNode {
  selector: string;
  tag: string;
  role: string | null;
  text: string;
  rect: { x: number; y: number; width: number; height: number };
  aboveFold: boolean;
}

export interface DetectedCta {
  selector: string;
  tag: string;
  kind: "link" | "button" | "submit";
  text: string;
  href: string | null;
  reason: string;
  aboveFold: boolean;
  rect: { x: number; y: number; width: number; height: number };
}

export interface PageLink {
  href: string;
  text: string;
  sameOrigin: boolean;
}

export interface DomSnapshot {
  title: string;
  lang: string | null;
  visibleText: string;
  visibleTextChars: number;
  visibleTextTruncated: boolean;
  headings: Array<{ level: number; text: string; selector: string }>;
  nodes: DomNode[];
  ctas: DetectedCta[];
  links: PageLink[];
  linkCount: number;
  documentHeight: number;
}

export interface ViewportCaptureBase {
  viewport: ViewportName;
  width: number;
  height: number;
  finalUrl: string | null;
  httpStatus: number | null;
  blockedBy: string | null;
  navigationError: string | null;
  elapsedMs: number;
  jsErrors: JsError[];
  jsErrorCount: number;
  network: NetworkSummary;
  screenshots: ScreenshotRef[];
  dom: Measured<DomSnapshot>;
  layout: Measured<LayoutChecks>;
  axe: Measured<AxeSummary>;
  keyboard: Measured<KeyboardCheck>;
}

export interface TouchTargetIssue {
  selector: string;
  text: string;
  width: number;
  height: number;
}

export interface OverlayInfo {
  selector: string;
  kind: "dialog" | "fixed_cover" | "fixed_banner";
  coverage: number;
  text: string;
}

export interface FieldInfo {
  selector: string;
  type: string;
  name: string | null;
  hasAccessibleName: boolean;
  required: boolean;
  autocomplete: string | null;
  expectedAutocomplete: string | null;
}

export interface FormInfo {
  selector: string;
  method: string;
  actionHost: string | null;
  visible: boolean;
  fieldCount: number;
  requiredCount: number;
  fieldTypes: Record<string, number>;
  hasSubmitControl: boolean;
  fieldsets: number;
  visibleSteps: { detected: boolean; evidence: string | null };
  fields: FieldInfo[];
}

export interface LayoutChecks {
  horizontalOverflow: {
    overflows: boolean;
    scrollWidth: number;
    clientWidth: number;
    offenders: Array<{ selector: string; right: number }>;
  };
  touchTargets: {
    inspected: number;
    below24: number;
    below44: number;
    samples: TouchTargetIssue[];
  };
  overlays: OverlayInfo[];
  forms: FormInfo[];
  orphanFieldCount: number;
  inputsMissingAutocomplete: number;
  inputsMissingName: number;
}

export interface AxeViolation {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodeCount: number;
  samples: Array<{ selector: string; html: string; summary: string }>;
}

export interface AxeSummary {
  version: string;
  violations: AxeViolation[];
  violationCount: number;
  incompleteCount: number;
}

export interface KeyboardCheck {
  tabbableCount: number;
  tabPresses: number;
  reached: number;
  reachedRatio: number;
  stuckAt: string | null;
  focusIndicatorMissing: number;
  positiveTabindexCount: number;
  hasSkipLink: boolean;
  clickableNotFocusable: Array<{ selector: string; text: string }>;
}
