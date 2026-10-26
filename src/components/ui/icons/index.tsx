import {
  AiChat01Icon,
  AlertCircleIcon,
  BubbleChatIcon,
  Building03Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Award01Icon,
  Calendar01Icon,
  CashierIcon as CashierIconSource,
  Cancel01Icon,
  ContactBookIcon,
  DashboardCircleIcon,
  File01Icon,
  GlobeIcon as GlobeIconSource,
  HeadsetIcon as HeadsetIconSource,
  HelpCircleIcon,
  InstagramIcon as InstagramIconSource,
  Invoice01Icon,
  Mail01Icon,
  Menu01Icon,
  Mic01Icon,
  Package01Icon,
  Payment01Icon,
  Plug01Icon,
  PlusSignIcon,
  Refresh01Icon,
  Robot01Icon,
  Rocket01Icon,
  ShoppingCart01Icon,
  FileSpreadsheetIcon,
  Store01Icon,
  Tick02Icon,
  TranslateIcon as TranslateIconSource,
  UserGroupIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from "@hugeicons/react";

type IconProps = Omit<HugeiconsIconProps, "icon">;

function createIcon(source: IconSvgElement) {
  return function Icon(props: IconProps) {
    return <HugeiconsIcon icon={source} aria-hidden="true" focusable="false" {...props} />;
  };
}

export const DashboardIcon = createIcon(DashboardCircleIcon);
export const TeamIcon = createIcon(UserGroupIcon);
export const RefreshIcon = createIcon(Refresh01Icon);
export const RobotIcon = createIcon(Robot01Icon);
export const DocumentIcon = createIcon(File01Icon);
export const ChatIcon = createIcon(AiChat01Icon);
export const GlobeIcon = createIcon(GlobeIconSource);
export const RocketIcon = createIcon(Rocket01Icon);
export const MicIcon = createIcon(Mic01Icon);
export const ArrowRightIcon = createIcon(ArrowRight01Icon);
export const ArrowUpRightIcon = createIcon(ArrowUpRight01Icon);
export const PlusIcon = createIcon(PlusSignIcon);
export const CheckIcon = createIcon(Tick02Icon);
export const CalendarIcon = createIcon(Calendar01Icon);
export const MailIcon = createIcon(Mail01Icon);
export const AlertIcon = createIcon(AlertCircleIcon);
export const InstagramIcon = createIcon(InstagramIconSource);
export const WhatsAppIcon = createIcon(WhatsappIcon);
export const StockIcon = createIcon(Package01Icon);
export const OrdersIcon = createIcon(ShoppingCart01Icon);
export const CashierIcon = createIcon(CashierIconSource);
export const SpreadsheetIcon = createIcon(FileSpreadsheetIcon);
export const InvoiceIcon = createIcon(Invoice01Icon);
export const StoreIcon = createIcon(Store01Icon);
export const BuildingIcon = createIcon(Building03Icon);
export const ConversationIcon = createIcon(BubbleChatIcon);
export const PlugIcon = createIcon(Plug01Icon);
export const AwardIcon = createIcon(Award01Icon);
export const PaymentIcon = createIcon(Payment01Icon);
export const ContactsIcon = createIcon(ContactBookIcon);
export const HeadsetIcon = createIcon(HeadsetIconSource);
export const MenuIcon = createIcon(Menu01Icon);
export const CloseIcon = createIcon(Cancel01Icon);
export const LanguageIcon = createIcon(TranslateIconSource);
export const HelpIcon = createIcon(HelpCircleIcon);
