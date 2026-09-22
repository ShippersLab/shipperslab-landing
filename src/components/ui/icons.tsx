import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from "@hugeicons/react";
import {
  AiChat01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Attachment01Icon,
  CloudUploadIcon,
  DashboardCircleIcon,
  Database01Icon,
  File01Icon,
  GlobeIcon as GlobeIconSource,
  Mic01Icon,
  PlusSignIcon,
  Refresh01Icon,
  Robot01Icon,
  Rocket01Icon,
  SmartPhone01Icon,
  Tick02Icon,
  UserGroupIcon,
  WorkflowCircle06Icon,
} from "@hugeicons/core-free-icons";

type IconProps = Omit<HugeiconsIconProps, "icon">;

function createIcon(source: IconSvgElement) {
  return function Icon(props: IconProps) {
    return <HugeiconsIcon icon={source} {...props} />;
  };
}

export const DashboardIcon = createIcon(DashboardCircleIcon);
export const DatabaseIcon = createIcon(Database01Icon);
export const TeamIcon = createIcon(UserGroupIcon);
export const WorkflowIcon = createIcon(WorkflowCircle06Icon);
export const UploadIcon = createIcon(CloudUploadIcon);
export const RefreshIcon = createIcon(Refresh01Icon);
export const RobotIcon = createIcon(Robot01Icon);
export const DocumentIcon = createIcon(File01Icon);
export const ChatIcon = createIcon(AiChat01Icon);
export const GlobeIcon = createIcon(GlobeIconSource);
export const PhoneIcon = createIcon(SmartPhone01Icon);
export const RocketIcon = createIcon(Rocket01Icon);
export const AttachmentIcon = createIcon(Attachment01Icon);
export const MicIcon = createIcon(Mic01Icon);
export const SendIcon = createIcon(ArrowUp01Icon);
export const ArrowRightIcon = createIcon(ArrowRight01Icon);
export const PlusIcon = createIcon(PlusSignIcon);
export const CheckIcon = createIcon(Tick02Icon);
