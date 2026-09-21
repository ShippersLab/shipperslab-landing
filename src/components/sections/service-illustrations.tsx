import { AttachmentIcon, MicIcon, SendIcon, WorkflowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const DOTS = ["a", "b", "c"];

export function DashboardIllustration() {
  const rows = ["w-full", "w-5/6", "w-full", "w-2/3"];

  return (
    <div
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-xs flex-col gap-3 rounded-lg border border-border bg-paper p-4"
    >
      <div className="flex items-center gap-1.5">
        {DOTS.map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-border" />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 pt-1">
        {rows.map((width, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="size-4 shrink-0 rounded-sm border border-border" />
            <span className={cn("h-2 rounded-full bg-border", width)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlowIllustration() {
  return (
    <div
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-xs items-center justify-between gap-2"
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-paper font-mono text-label text-muted uppercase">
        CRM
      </div>
      <span className="h-px flex-1 bg-border" />
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-ink bg-ink text-paper">
        <WorkflowIcon className="size-5" />
      </div>
      <span className="h-px flex-1 bg-border" />
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-paper font-mono text-label text-muted uppercase">
        API
      </div>
    </div>
  );
}

export function AiInputIllustration() {
  return (
    <div aria-hidden className="absolute inset-8 z-1 m-auto h-fit max-w-xs">
      <div className="rounded-lg border border-border bg-paper p-3">
        <div className="p-2 pb-3 text-sm text-muted">
          Necesito automatizar la carga de facturas…
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="flex size-7 items-center justify-center rounded-full text-muted">
              <AttachmentIcon className="size-4" />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full text-muted">
              <MicIcon className="size-4" />
            </span>
          </div>
          <span className="flex size-7 items-center justify-center rounded-full bg-ink text-paper">
            <SendIcon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function BrowserIllustration() {
  return (
    <div
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-xs flex-col overflow-hidden rounded-lg border border-border bg-paper"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        {DOTS.map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-border" />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="h-3 w-2/3 rounded-full bg-ink/10" />
        <span className="h-2 w-full rounded-full bg-border" />
        <span className="h-2 w-5/6 rounded-full bg-border" />
        <span className="mt-2 h-16 w-full rounded-md border border-border" />
      </div>
    </div>
  );
}
