import { StepCard, StepParagraph } from "@/components/sections/como-trabajamos/step-card";
import { CheckIcon, ConversationIcon, DocumentIcon, RefreshIcon } from "@/components/ui/icons";
import type { Messages } from "@/i18n/get-messages";

type Steps = Messages["comoTrabajamos"]["steps"];

type Fee = { label: string; body: string; tag?: string };

const ICON_SIZE = 14;

export function CallDetails({ step }: { step: Steps["call"] }) {
  return (
    <>
      <StepParagraph>{step.body}</StepParagraph>
      <StepCard
        label={step.topics.label}
        icon={<ConversationIcon size={ICON_SIZE} className="shrink-0" />}
      >
        <ul className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {step.topics.items.map((item) => (
            <li key={item} className="p-5 text-base text-ink">
              {item}
            </li>
          ))}
        </ul>
      </StepCard>
    </>
  );
}

export function ScopeDetails({ step }: { step: Steps["scope"] }) {
  return (
    <>
      <StepParagraph>{step.body}</StepParagraph>
      <StepCard
        label={step.document.label}
        icon={<DocumentIcon size={ICON_SIZE} className="shrink-0" />}
      >
        <ul className="divide-y divide-border">
          {step.document.items.map((item) => (
            <li key={item} className="flex items-center gap-3 px-5 py-4 text-base text-ink">
              <CheckIcon size={16} className="shrink-0 text-muted" />
              {item}
            </li>
          ))}
        </ul>
      </StepCard>
    </>
  );
}

export function WeeklyDetails({ step }: { step: Steps["weekly"] }) {
  return (
    <>
      <StepParagraph>{step.body}</StepParagraph>
      <StepCard
        label={step.cycle.label}
        icon={<RefreshIcon size={ICON_SIZE} className="shrink-0" />}
      >
        <ol className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {step.cycle.items.map((item) => (
            <li key={item.label} className="flex flex-col gap-2 p-5">
              <span className="text-lg text-ink">{item.label}</span>
              <span className="text-base leading-relaxed text-muted">{item.body}</span>
            </li>
          ))}
        </ol>
      </StepCard>
    </>
  );
}

export function PricingDetails({ step }: { step: Steps["pricing"] }) {
  const fees: readonly Fee[] = step.fees;

  return (
    <>
      <StepParagraph>{step.body}</StepParagraph>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {fees.map((fee) => (
          <li key={fee.label} className="flex flex-col gap-3 rounded-lg border border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg text-ink">{fee.label}</h3>
              {fee.tag ? (
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-label uppercase tracking-label text-muted">
                  {fee.tag}
                </span>
              ) : null}
            </div>
            <p className="text-base leading-relaxed text-muted">{fee.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
