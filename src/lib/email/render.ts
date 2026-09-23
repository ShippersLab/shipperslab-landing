export type EmailRow = readonly [label: string, value: string];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderEmail(rows: EmailRow[], body: string) {
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", body].join("\n");

  const htmlRows = rows
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return {
    text,
    html: `${htmlRows}<p style="white-space:pre-wrap">${escapeHtml(body)}</p>`,
  };
}
