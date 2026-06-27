import { CustomerProps } from "./customer.type";

export interface TicketProps {
  id: string;
  name: string;
  title: string;
  description?: string | null;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  customerId: string | null;
  userId: string | null;
  customer?: CustomerProps | null;
}
