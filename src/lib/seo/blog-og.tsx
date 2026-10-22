import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BLOG_OG_HEIGHT, BLOG_OG_WIDTH } from "@/lib/seo/blog-og-path";

const LOGO_WIDTH = 110;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 179) / 325);
const PAPER_FILL = "#EEEEF3";

export const blogOgSize = {
  width: BLOG_OG_WIDTH,
  height: BLOG_OG_HEIGHT,
};

function toDataUri(mime: string, data: Buffer) {
  return `data:${mime};base64,${data.toString("base64")}`;
}

export async function loadBlogOgAssets() {
  const [pixel, medium, regular, logo, background] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/GeistPixel-Square.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "public/logo/white.svg")),
    readFile(join(process.cwd(), "src/assets/og/blog-bg.png")),
  ]);

  const paperLogo = Buffer.from(
    logo.toString("utf8").replace(/fill="#F2F3F5"/gi, `fill="${PAPER_FILL}"`),
  );

  return {
    fonts: [
      { name: "Geist Pixel", data: pixel, style: "normal" as const, weight: 500 as const },
      { name: "Geist", data: medium, style: "normal" as const, weight: 500 as const },
      { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
    ],
    logoSrc: toDataUri("image/svg+xml", paperLogo),
    backgroundSrc: toDataUri("image/png", background),
  };
}

type BlogOgCardProps = {
  title: string;
  logoSrc: string;
  backgroundSrc: string;
};

export function BlogOgCard({ title, logoSrc, backgroundSrc }: BlogOgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0b0f1a",
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "100% 100%",
        padding: "72px 80px",
        color: "#eeeef3",
      }}
    >
      <div style={{ display: "flex" }}>
        <img src={logoSrc} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Geist Pixel",
          fontSize: 64,
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
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
          fontFamily: "Geist",
          fontWeight: 400,
          fontSize: 24,
          color: "rgba(238, 238, 243, 0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "8px 16px",
            border: "1px solid rgba(238, 238, 243, 0.25)",
            borderRadius: 8,
          }}
        >
          Blog
        </div>
        <div style={{ display: "flex" }}>shipperslab.tech</div>
      </div>
    </div>
  );
}
