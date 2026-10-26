import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { Container } from "@/components/ui/section/container";

type AfterDeliveryItem = {
  label: string;
  body: string;
};

type ServiceAfterDeliveryProps = {
  items: readonly AfterDeliveryItem[];
};

export function ServiceAfterDelivery({ items }: ServiceAfterDeliveryProps) {
  return (
    <Container className="w-full py-16 sm:py-20">
      <StaggerReveal as="ul" className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.label} className="rounded-lg border border-border p-5">
            <p className="font-mono text-sm tracking-tight text-muted">{item.label}</p>
            <p className="mt-3 text-base leading-relaxed text-ink">{item.body}</p>
          </li>
        ))}
      </StaggerReveal>
    </Container>
  );
}
