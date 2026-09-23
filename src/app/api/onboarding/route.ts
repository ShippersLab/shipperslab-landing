import { NextResponse } from "next/server";

import { parseOnboardingLocale, parseOnboardingRequest } from "@/lib/onboarding/request";
import { deliverOnboardingRequest } from "@/lib/onboarding/send";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const onboarding = parseOnboardingRequest(payload);

  if (!onboarding) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await deliverOnboardingRequest(onboarding, parseOnboardingLocale(payload));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
