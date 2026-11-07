export class AuditTimeoutError extends Error {
  readonly ms: number;
  constructor(label: string, ms: number) {
    super(`${label} excedió ${ms} ms`);
    this.name = "AuditTimeoutError";
    this.ms = ms;
  }
}

export interface Deadline {
  signal: AbortSignal;
  remainingMs: () => number;
  dispose: () => void;
}

export function createDeadline(ms: number, parent?: AbortSignal): Deadline {
  const controller = new AbortController();
  const startedAt = Date.now();
  const timer = setTimeout(() => controller.abort(new AuditTimeoutError("deadline", ms)), ms);
  const onParentAbort = () => controller.abort(parent?.reason);
  if (parent) {
    if (parent.aborted) controller.abort(parent.reason);
    else parent.addEventListener("abort", onParentAbort, { once: true });
  }
  return {
    signal: controller.signal,
    remainingMs: () => Math.max(0, ms - (Date.now() - startedAt)),
    dispose: () => {
      clearTimeout(timer);
      parent?.removeEventListener("abort", onParentAbort);
    },
  };
}

export async function withTimeout<T>(
  label: string,
  ms: number,
  task: (signal: AbortSignal) => Promise<T>,
  parent?: AbortSignal,
): Promise<T> {
  const deadline = createDeadline(ms, parent);
  const timeoutReason = new AuditTimeoutError(label, ms);
  let rejectTimeout: (error: unknown) => void = () => {};
  const timeoutPromise = new Promise<never>((_, reject) => {
    rejectTimeout = reject;
  });
  const onAbort = () => {
    const reason = deadline.signal.reason;
    rejectTimeout(reason instanceof AuditTimeoutError ? timeoutReason : reason);
  };
  deadline.signal.addEventListener("abort", onAbort, { once: true });
  try {
    return await Promise.race([task(deadline.signal), timeoutPromise]);
  } finally {
    deadline.signal.removeEventListener("abort", onAbort);
    deadline.dispose();
  }
}

export function isTimeoutError(error: unknown): boolean {
  if (error instanceof AuditTimeoutError) return true;
  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return true;
  }
  return false;
}
