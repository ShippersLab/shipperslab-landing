import * as React from "react";

import {
  cable,
  keyboard,
  plate,
  qrStand,
} from "@/components/sections/services/figures/presence/bench";
import { computer } from "@/components/sections/services/figures/presence/casing";

const BODY = [plate(), computer(), qrStand(), keyboard(), cable()].join("");

export function PresenceArt() {
  return <g dangerouslySetInnerHTML={{ __html: BODY }} />;
}
