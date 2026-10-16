"use client";

import { useEffect, useState } from "react";

export type DesignTokens = {
  paper: string;
  accent: string;
  ink: string;
  surface: string;
};

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function channelToHex(channel: number) {
  return Math.round(Math.min(255, Math.max(0, channel)))
    .toString(16)
    .padStart(2, "0");
}

function rgbToHex(channels: number[]) {
  return `#${channels.map(channelToHex).join("")}`;
}

function readSurface(fallback: string) {
  const match = getComputedStyle(document.body).backgroundColor.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return fallback;
  if (match.length === 4 && Number(match[3]) === 0) return fallback;
  return rgbToHex(match.slice(0, 3).map(Number));
}

export function mixHex(from: string, to: string, amount: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex(a.map((channel, index) => channel + (b[index] - channel) * amount));
}

export function useDesignTokens() {
  const [tokens, setTokens] = useState<DesignTokens | null>(null);

  useEffect(() => {
    const paper = readToken("--paper");
    setTokens({
      paper,
      accent: readToken("--accent"),
      ink: readToken("--ink"),
      surface: readSurface(paper),
    });
  }, []);

  return tokens;
}
