import {
  BuildingIcon,
  CalendarIcon,
  CashierIcon,
  ContactsIcon,
  ConversationIcon,
  GlobeIcon,
  HeadsetIcon,
  InvoiceIcon,
  OrdersIcon,
  PaymentIcon,
  SpreadsheetIcon,
  StockIcon,
  StoreIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const iconsById: Record<string, typeof StockIcon> = {
  stock: StockIcon,
  orders: OrdersIcon,
  cash: CashierIcon,
  appointments: CalendarIcon,
  distributor: StockIcon,
  events: BuildingIcon,
  services: BuildingIcon,
  store: StoreIcon,
  catalog: StoreIcon,
  web: GlobeIcon,
  questions: ConversationIcon,
  handoff: HeadsetIcon,
  whatsapp: WhatsAppIcon,
  sheets: SpreadsheetIcon,
  mercadopago: PaymentIcon,
  tiendanube: StoreIcon,
  arca: InvoiceIcon,
  crm: ContactsIcon,
};

export function serviceIcon(id: string) {
  return iconsById[id] ?? StockIcon;
}
