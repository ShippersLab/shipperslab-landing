export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function readString(source: Record<string, unknown>, key: string, max: number) {
  const value = source[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function readStringList(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}
