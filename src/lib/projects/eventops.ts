import calendar from "@/assets/images/projects/eventops/calendar.webp";
import clients from "@/assets/images/projects/eventops/clients.webp";
import events from "@/assets/images/projects/eventops/events.webp";
import finance from "@/assets/images/projects/eventops/finance.webp";
import hero from "@/assets/images/projects/eventops/hero.webp";
import personal from "@/assets/images/projects/eventops/personal.webp";

export const eventopsImages = {
  hero,
  gallery: [hero, calendar, events, clients, personal, finance],
} as const;
