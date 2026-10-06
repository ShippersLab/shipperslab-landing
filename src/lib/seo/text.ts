export function singleLine(text: string) {
  return text.replace(/\s*\n\s*/g, " ");
}

export function plainText(text: string) {
  return singleLine(text).replace(/\{([^}]+)\}/g, "$1");
}
