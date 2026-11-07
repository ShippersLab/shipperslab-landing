import type { Limits, RejectionCode, Section } from "@/lib/audit/types/common";
import type { EvidenceData } from "@/lib/audit/types/evidence";
import type { PerformanceData } from "@/lib/audit/types/performance";
import type { SeoData } from "@/lib/audit/types/seo";
import type { TechnicalData } from "@/lib/audit/types/technical";
import type { UsabilityData } from "@/lib/audit/types/usability";

export type {
  AuditFile,
  Limits,
  Measured,
  RejectionCode,
  Section,
  SectionStatus,
} from "@/lib/audit/types/common";
export type { EvidenceData } from "@/lib/audit/types/evidence";
export type { PerformanceData } from "@/lib/audit/types/performance";
export type { SeoData } from "@/lib/audit/types/seo";
export type { TechnicalData } from "@/lib/audit/types/technical";
export type { UsabilityData } from "@/lib/audit/types/usability";

export interface AuditInput {
  url: string;
  limits?: Partial<Limits>;
}

export interface AuditResult {
  schemaVersion: string;
  engine: { name: string; version: string };
  input: {
    requested: string;
    normalizedUrl: string | null;
    accepted: boolean;
    rejection: { code: RejectionCode; message: string } | null;
  };
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  limits: Limits;
  sections: {
    technical: Section<TechnicalData>;
    performance: Section<PerformanceData>;
    usability: Section<UsabilityData>;
    seo: Section<SeoData>;
    evidence: Section<EvidenceData>;
  };
}
