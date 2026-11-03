import { INLINE_LINK_CLASS, InlineText } from "@/components/ui/inline-text";

type CaseProseProps = {
  paragraphs: readonly string[];
};

export function CaseProse({ paragraphs }: CaseProseProps) {
  return (
    <div className="flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          <InlineText className={INLINE_LINK_CLASS} text={paragraph} />
        </p>
      ))}
    </div>
  );
}
