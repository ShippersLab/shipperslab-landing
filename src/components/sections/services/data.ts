import type { HugeiconsIconProps } from "@hugeicons/react";
import type { ReactNode } from "react";

import {
  AiInputIllustration,
  BrowserIllustration,
  DashboardIllustration,
  FlowIllustration,
} from "@/components/sections/services/illustrations";
import {
  ChatIcon,
  DashboardIcon,
  DatabaseIcon,
  DocumentIcon,
  GlobeIcon,
  PhoneIcon,
  RefreshIcon,
  RobotIcon,
  RocketIcon,
  TeamIcon,
  UploadIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import type { Messages } from "@/i18n/get-messages";

export type ServiceId = Messages["services"]["items"][number]["id"];

export type ServiceIcon = (props: Omit<HugeiconsIconProps, "icon">) => ReactNode;

export const SERVICE_ICONS: Record<ServiceId, ServiceIcon[]> = {
  software: [DashboardIcon, DatabaseIcon, TeamIcon],
  automation: [WorkflowIcon, UploadIcon, RefreshIcon],
  ai: [RobotIcon, DocumentIcon, ChatIcon],
  products: [GlobeIcon, PhoneIcon, RocketIcon],
};

export const SERVICE_ILLUSTRATIONS: Record<ServiceId, () => ReactNode> = {
  software: DashboardIllustration,
  automation: FlowIllustration,
  ai: AiInputIllustration,
  products: BrowserIllustration,
};
