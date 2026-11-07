import { NextResponse } from "next/server";

import { isDeliverableEmail } from "@/lib/onboarding/email-domain";
import { parseOnboardingLocale, parseOnboardingRequest } from "@/lib/onboarding/request";
import { deliverOnboardingRequest } from "@/lib/onboarding/send";
import { getSpamReason } from "@/lib/onboarding/spam";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const spamReason = getSpamReason(payload);

  if (spamReason) {
    console.warn(`Onboarding submission dropped: ${spamReason}`);
    return NextResponse.json({ ok: true });
  }

  const onboarding = parseOnboardingRequest(payload);

  if (!onboarding) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!(await isDeliverableEmail(onboarding.email))) {
    return NextResponse.json({ ok: false, errors: { email: "emailInvalid" } }, { status: 400 });
  }

  try {
    await deliverOnboardingRequest(onboarding, parseOnboardingLocale(payload));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
