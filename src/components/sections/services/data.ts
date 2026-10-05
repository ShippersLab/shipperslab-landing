import type { HugeiconsIconProps } from "@hugeicons/react";
import type { ReactNode } from "react";

import {
  BotsIllustration,
  IntegrationsIllustration,
  PresenceIllustration,
  SystemsIllustration,
} from "@/components/sections/services/illustrations";
import {
  CalendarIcon,
  ChatIcon,
  DashboardIcon,
  GlobeIcon,
  InvoiceIcon,
  LinkIcon,
  OrdersIcon,
  StockIcon,
  StoreIcon,
  TeamIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import type { Messages } from "@/i18n/get-messages";

export type ServiceId = Messages["services"]["items"][number]["id"];

export type ServiceIcon = (props: Omit<HugeiconsIconProps, "icon">) => ReactNode;

export const SERVICE_ICONS: Record<ServiceId, ServiceIcon[]> = {
  systems: [StockIcon, CalendarIcon, DashboardIcon],
  integrations: [WhatsAppIcon, InvoiceIcon, LinkIcon],
  bots: [ChatIcon, OrdersIcon, TeamIcon],
  presence: [GlobeIcon, CalendarIcon, StoreIcon],
};

export const SERVICE_ILLUSTRATIONS: Record<ServiceId, () => ReactNode> = {
  systems: SystemsIllustration,
  integrations: IntegrationsIllustration,
  bots: BotsIllustration,
  presence: PresenceIllustration,
};
