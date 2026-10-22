import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BLOG_OG_HEIGHT, BLOG_OG_WIDTH } from "@/lib/seo/blog-og-path";

const pixelFont = readFile(join(process.cwd(), "src/assets/fonts/GeistPixel-Square.ttf"));
const mediumFont = readFile(join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf"));
const regularFont = readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf"));

export const blogOgSize = {
  width: BLOG_OG_WIDTH,
  height: BLOG_OG_HEIGHT,
};

export async function blogOgFonts() {
  const [pixel, medium, regular] = await Promise.all([pixelFont, mediumFont, regularFont]);

  return [
    { name: "Geist Pixel", data: pixel, style: "normal" as const, weight: 500 as const },
    { name: "Geist", data: medium, style: "normal" as const, weight: 500 as const },
    { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
  ];
}

export function BlogOgCard({ title }: { title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0b0f1a",
        padding: "72px 80px",
        color: "#eeeef3",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 28,
            height: 28,
            backgroundColor: "#fe5634",
            marginRight: 18,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Pixel",
            fontSize: 40,
            letterSpacing: "-0.04em",
          }}
        >
          shipperslab
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Geist",
          fontSize: 58,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          width: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Geist",
            fontSize: 26,
            color: "#fe5634",
            letterSpacing: "0.08em",
          }}
        >
          BLOG
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Geist",
            fontWeight: 400,
            fontSize: 26,
            color: "#a7afbf",
          }}
        >
          shipperslab.tech
        </div>
      </div>
    </div>
  );
}
