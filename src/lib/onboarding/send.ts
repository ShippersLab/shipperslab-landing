import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { renderEmail, renderParagraphs } from "@/lib/email/render";
import { sendEmail } from "@/lib/email/send";
import type { OnboardingRequest } from "@/lib/onboarding/request";

const teamLabels = getMessages("es").onboarding;

async function notifyTeam(request: OnboardingRequest) {
  const needs = request.needs.map((need) => teamLabels.needs[need]).join(", ");

  await sendEmail({
    subject: `Nuevo proyecto desde shipperslab.tech: ${request.company || request.name}`,
    replyTo: request.email,
    ...renderEmail(
      [
        ["Nombre", request.name],
        ["Empresa", request.company || "-"],
        ["Email", request.email],
        ["WhatsApp", request.whatsapp || "-"],
        ["Necesita", needs || "-"],
        ["Etapa", request.stage ? teamLabels.stages[request.stage] : "-"],
      ],
      request.message,
    ),
  });
}

async function confirmToSender(request: OnboardingRequest, locale: Locale) {
  const copy = getMessages(locale).onboarding.confirmation;

  await sendEmail({
    to: request.email,
    subject: copy.subject,
    ...renderParagraphs([
      copy.greeting.replace("{name}", request.name),
      copy.body,
      copy.followUp,
      copy.signature,
    ]),
  });
}

export async function deliverOnboardingRequest(request: OnboardingRequest, locale: Locale) {
  await notifyTeam(request);

  try {
    await confirmToSender(request, locale);
  } catch (error) {
    console.error(error);
  }
}
