import type { Measured } from "@/lib/audit/types/common";
import type {
  AxeSummary,
  KeyboardCheck,
  LayoutChecks,
  ViewportName,
} from "@/lib/audit/types/viewport";

export interface UsabilityViewportData {
  viewport: ViewportName;
  axe: Measured<AxeSummary>;
  layout: Measured<LayoutChecks>;
  keyboard: Measured<KeyboardCheck>;
}

export interface UsabilityData {
  viewports: UsabilityViewportData[];
  limits: string[];
  forms: { inspectedWithoutSubmitting: true; note: string };
}
