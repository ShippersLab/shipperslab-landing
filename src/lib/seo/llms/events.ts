import es from "@/i18n/messages/es.json";
import { bullets, canonical, heading, joinBlocks, page, renderCopy } from "@/lib/seo/llms/copy";
import { site } from "@/lib/site";

export function buildEventos() {
  const copy = es.events;

  return page("/eventos", [
    es.seo.eventos.title,
    es.seo.eventos.description,
    heading(3, copy.title),
    copy.description,
    heading(4, copy.formatsTitle),
    copy.formatsDescription,
    renderCopy(copy.productNote),
    ...copy.formats.map((format) => joinBlocks([heading(4, format.title), format.description])),
    heading(4, copy.sponsorTitle),
    copy.sponsorDescription,
    bullets(copy.sponsorWays.map((way) => `${way.title}: ${way.description}`)),
    heading(4, copy.gallery.title),
    copy.gallery.description,
    bullets(
      copy.gallery.items.map(
        (item) => `${item.caption} (${item.label}): ${item.imageAlt} ${canonical(item.image)}`,
      ),
    ),
    `[${copy.cta}](mailto:${site.emails.events})`,
  ]);
}
