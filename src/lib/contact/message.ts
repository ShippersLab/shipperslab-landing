export function buildWhatsAppUrl(number: string | undefined, text: string) {
  if (!number) {
    return null;
  }

  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
