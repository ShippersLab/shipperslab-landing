import { buildLlmsFullTxt } from "@/lib/seo/llms-full";

export const dynamic = "force-static";

const body = buildLlmsFullTxt();

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
