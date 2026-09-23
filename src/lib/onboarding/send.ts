import { getMessages } from "@/i18n/get-messages";
import { renderEmail } from "@/lib/email/render";
import { sendEmail } from "@/lib/email/send";
import type { OnboardingRequest } from "@/lib/onboarding/request";

const labels = getMessages("es").onboarding;

export async function sendOnboardingRequest(request: OnboardingRequest) {
  const needs = request.needs.map((need) => labels.needs[need]).join(", ");

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
        ["Etapa", request.stage ? labels.stages[request.stage] : "-"],
      ],
      request.message,
    ),
  });
}
