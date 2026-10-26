import * as React from "react";

import type { SolidPaths, Tone } from "@/components/ui/iso/iso-kit";

export type Bind = (key: string) => (node: SVGElement | null) => void;

interface Props {
  id: string;
  bind: Bind;
  paths: SolidPaths;
  tone?: Tone;
}

export function DynSolid({ id, bind, paths, tone = "hi" }: Props) {
  return (
    <g ref={bind(id)} className="iso-solid">
      <path className="iso-fill" d={paths.fill} />
      {[0, 1, 2, 3].map((shade) => (
        <path key={shade} className="iso-shade" data-shade={shade} d={paths.shades[shade] ?? ""} />
      ))}
      <path className="iso-top" d={paths.top} />
      <path className="iso-line iso-crease" data-tone="faint" d={paths.crease} />
      <path className="iso-line iso-bevel" data-tone="faint" d={paths.bevel ?? ""} />
      <path className="iso-line iso-edge" data-tone={tone} d={paths.outline} />
    </g>
  );
}

export function paint(group: Element | null | undefined, paths: SolidPaths) {
  if (!group) return;
  const kids = group.children;
  kids[0].setAttribute("d", paths.fill);
  for (let shade = 0; shade < 4; shade++)
    kids[1 + shade].setAttribute("d", paths.shades[shade] ?? "");
  kids[5].setAttribute("d", paths.top);
  kids[6].setAttribute("d", paths.crease);
  kids[7].setAttribute("d", paths.bevel ?? "");
  kids[8].setAttribute("d", paths.outline);
}

export const setD = (node: Element | null | undefined, d: string) => node?.setAttribute("d", d);
