import type { Measured } from "@/lib/audit/types/common";

export type Strategy = "mobile" | "desktop";
export type FormFactor = "phone" | "desktop";

export interface LabMetric {
  value: number;
  unit: "ms" | "unitless";
  source: "PageSpeed Insights / Lighthouse (laboratorio)";
}

export interface LabResult {
  strategy: Strategy;
  lcp: LabMetric;
  cls: LabMetric;
  tbt: LabMetric;
  lighthouseVersion: string | null;
  fetchTime: string | null;
  finalUrl: string | null;
  warnings: string[];
  note: string;
}

export interface FieldMetric {
  value: number;
  unit: "ms" | "unitless";
  percentile: "p75";
  distribution: { good: number; needsImprovement: number; poor: number } | null;
  scope: "url" | "origin";
  queriedKey: string;
  collectionPeriod: { firstDate: string; lastDate: string } | null;
  source: "CrUX API";
}

export interface FieldResult {
  formFactor: FormFactor;
  lcp: Measured<FieldMetric>;
  inp: Measured<FieldMetric>;
  cls: Measured<FieldMetric>;
  urlRecord: "found" | "not_found" | "error";
  originRecord: "found" | "not_found" | "error" | "not_queried";
}

export interface PerformanceData {
  lab: { mobile: Measured<LabResult>; desktop: Measured<LabResult> };
  field: { phone: Measured<FieldResult>; desktop: Measured<FieldResult> };
}
