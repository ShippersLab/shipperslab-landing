import { NextResponse } from "next/server";

import { parseContactMessage } from "@/lib/contact/message";
import { sendContactMessage } from "@/lib/contact/send";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const message = parseContactMessage(payload);

  if (!message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await sendContactMessage(message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
