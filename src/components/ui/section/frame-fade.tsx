export function FrameFade() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-x-px top-0 z-10 h-40 bg-linear-to-b from-paper to-transparent sm:h-56"
    />
  );
}
