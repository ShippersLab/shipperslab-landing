import { ProjectDetail } from "@/components/sections/casos/project-detail";
import { getMessages } from "@/i18n/get-messages";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const messages = getMessages("es").casos.eventops;

export const metadata = buildPageMetadata({
  title: messages.metaTitle,
  description: messages.metaDescription,
  path: "/casos/eventops",
});

export default function EventopsCasePage() {
  return <ProjectDetail />;
}
