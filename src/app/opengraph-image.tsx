import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [illustrationSource, geistSemiBold, geistMedium] = await Promise.all([
    readFile(join(process.cwd(), "public/images/hero-illustration.webp")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf")),
  ]);

  const illustration = await sharp(illustrationSource)
    .resize(1600)
    .jpeg({ quality: 85 })
    .toBuffer();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#F2F3F5",
        backgroundImage: `url(data:image/jpeg;base64,${illustration.toString("base64")})`,
        backgroundSize: "cover",
        backgroundPosition: "70% center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 88,
          left: 400,
          right: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Geist SemiBold",
            fontSize: 64,
            color: "#0B0F1A",
            letterSpacing: -2,
          }}
        >
          ShippersLab
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontFamily: "Geist Medium",
            fontSize: 30,
            color: "#6E7686",
          }}
        >
          Diseñamos y construimos productos digitales.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            width: 64,
            height: 4,
            backgroundColor: "#FE5634",
            borderRadius: 2,
          }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist SemiBold", data: geistSemiBold, weight: 600, style: "normal" },
        { name: "Geist Medium", data: geistMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
