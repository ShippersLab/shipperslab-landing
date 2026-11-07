const IPV4_BLOCKED_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x00000000, 8],
  [0x0a000000, 8],
  [0x64400000, 10],
  [0x7f000000, 8],
  [0xa9fe0000, 16],
  [0xac100000, 12],
  [0xc0000000, 24],
  [0xc0000200, 24],
  [0xc0586300, 24],
  [0xc0a80000, 16],
  [0xc6120000, 15],
  [0xc6336400, 24],
  [0xcb007100, 24],
  [0xe0000000, 4],
  [0xf0000000, 4],
];

const IPV4_BLOCKED_SINGLES: readonly number[] = [0xa83f8110];

export function ipv4ToNumber(parts: readonly number[]): number {
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function inRange(value: number, base: number, prefix: number): boolean {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return (value & mask) >>> 0 === (base & mask) >>> 0;
}

export function isPublicIpv4Number(value: number): boolean {
  if (IPV4_BLOCKED_SINGLES.includes(value)) return false;
  return !IPV4_BLOCKED_RANGES.some(([base, prefix]) => inRange(value, base, prefix));
}

function parseNumericLabel(label: string): number | null {
  if (label === "") return null;
  if (/^0[xX][0-9a-fA-F]*$/.test(label)) {
    const digits = label.slice(2);
    return digits === "" ? 0 : Number.parseInt(digits, 16);
  }
  if (/^0[0-7]+$/.test(label)) return Number.parseInt(label, 8);
  if (/^(0|[1-9][0-9]*)$/.test(label)) return Number.parseInt(label, 10);
  return null;
}

export function endsInNumber(host: string): boolean {
  const labels = host.split(".");
  if (labels[labels.length - 1] === "") labels.pop();
  const last = labels[labels.length - 1];
  if (last === undefined) return false;
  return /^[0-9]+$/.test(last) || /^0[xX][0-9a-fA-F]*$/.test(last);
}

export function parseLooseIpv4(host: string): number | null {
  const labels = host.split(".");
  if (labels[labels.length - 1] === "" && labels.length > 1) labels.pop();
  if (labels.length < 1 || labels.length > 4) return null;
  const values: number[] = [];
  for (const label of labels) {
    const value = parseNumericLabel(label);
    if (value === null || !Number.isFinite(value)) return null;
    values.push(value);
  }
  const last = values[values.length - 1];
  const leading = values.slice(0, -1);
  if (leading.some((value) => value > 255)) return null;
  const lastLimit = 256 ** (5 - labels.length);
  if (last >= lastLimit) return null;
  let total = last;
  leading.forEach((value, index) => {
    total += value * 256 ** (3 - index);
  });
  return total >>> 0;
}

export function parseStrictIpv4(text: string): number | null {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(text);
  if (!match) return null;
  const parts = match.slice(1).map((part) => Number.parseInt(part, 10));
  if (parts.some((part) => part > 255)) return null;
  return ipv4ToNumber(parts);
}

export function parseIpv6(text: string): number[] | null {
  let source = text.trim();
  const zone = source.indexOf("%");
  if (zone !== -1) source = source.slice(0, zone);
  if (source.startsWith("[") && source.endsWith("]")) source = source.slice(1, -1);
  if (!source.includes(":")) return null;

  let tailV4: number | null = null;
  const lastColon = source.lastIndexOf(":");
  const tail = source.slice(lastColon + 1);
  if (tail.includes(".")) {
    tailV4 = parseStrictIpv4(tail);
    if (tailV4 === null) return null;
    source = `${source.slice(0, lastColon + 1)}0:0`;
  }

  const doubleColon = source.indexOf("::");
  if (doubleColon !== source.lastIndexOf("::")) return null;

  const toGroups = (part: string): string[] => (part === "" ? [] : part.split(":"));
  let groups: string[];
  if (doubleColon === -1) {
    groups = toGroups(source);
    if (groups.length !== 8) return null;
  } else {
    const head = toGroups(source.slice(0, doubleColon));
    const rest = toGroups(source.slice(doubleColon + 2));
    const missing = 8 - head.length - rest.length;
    if (missing < 1) return null;
    groups = [...head, ...Array<string>(missing).fill("0"), ...rest];
  }

  const words: number[] = [];
  for (const group of groups) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(group)) return null;
    words.push(Number.parseInt(group, 16));
  }
  if (tailV4 !== null) {
    words[6] = tailV4 >>> 16;
    words[7] = tailV4 & 0xffff;
  }
  return words;
}

function embeddedV4(high: number, low: number): number {
  return ((high << 16) | low) >>> 0;
}

export function isPublicIpv6Words(words: readonly number[]): boolean {
  const [w0, w1, w2, , , w5, w6, w7] = words;
  const allZeroUntil = (end: number) => words.slice(0, end).every((word) => word === 0);

  if (allZeroUntil(5) && w5 === 0xffff) return isPublicIpv4Number(embeddedV4(w6, w7));
  if (allZeroUntil(6)) return false;
  if (w0 === 0x64 && w1 === 0xff9b && words.slice(2, 6).every((word) => word === 0)) {
    return isPublicIpv4Number(embeddedV4(w6, w7));
  }
  if (w0 === 0x64 && w1 === 0xff9b) return false;
  if (w0 === 0x2002) return isPublicIpv4Number(embeddedV4(w1, w2));
  if ((w0 & 0xe000) !== 0x2000) return false;
  if (w0 === 0x2001 && w1 < 0x200) return false;
  if (w0 === 0x2001 && w1 === 0xdb8) return false;
  if (w0 === 0x2001 && (w1 & 0xfff0) === 0x10) return false;
  if (w0 === 0x3fff && (w1 & 0xf000) === 0) return false;
  return true;
}

export function isPublicAddress(address: string): boolean {
  const v4 = parseStrictIpv4(address);
  if (v4 !== null) return isPublicIpv4Number(v4);
  const v6 = parseIpv6(address);
  if (v6 !== null) return isPublicIpv6Words(v6);
  return false;
}
