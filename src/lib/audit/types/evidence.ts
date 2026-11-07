import type {
  DetectedCta,
  DomNode,
  PageLink,
  ScreenshotRef,
  ViewportName,
} from "@/lib/audit/types/viewport";

export interface EvidenceViewport {
  viewport: ViewportName;
  width: number;
  height: number;
  finalUrl: string | null;
  screenshots: ScreenshotRef[];
  visibleText: { text: string; chars: number; truncated: boolean };
  headings: Array<{ level: number; text: string; selector: string }>;
  nodes: DomNode[];
  ctas: DetectedCta[];
  links: PageLink[];
}

export interface EvidenceData {
  trust: "untrusted_site_content";
  handling: string;
  viewports: EvidenceViewport[];
}
