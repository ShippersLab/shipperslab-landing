import { isEmailContact, type ContactMessage } from "@/lib/contact/message";
import { renderEmail } from "@/lib/email/render";
import { sendEmail } from "@/lib/email/send";

export async function sendContactMessage(message: ContactMessage) {
  await sendEmail({
    subject: `Consulta desde shipperslab.tech: ${message.company || message.name}`,
    replyTo: isEmailContact(message.contactMethod) ? message.contactMethod : undefined,
    ...renderEmail(
      [
        ["Nombre", message.name],
        ["Empresa", message.company || "-"],
        ["Contacto", message.contactMethod],
      ],
      message.message,
    ),
  });
}
