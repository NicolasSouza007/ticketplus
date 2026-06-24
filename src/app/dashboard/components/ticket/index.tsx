"use client";

import { useState } from "react";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}
export function TicketItem({ customer, ticket }: TicketItemProps) {
  const [status, setStatus] = useState(ticket.status);
  const router = useRouter();

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      if (response.status === 200) {
        setStatus("Fechado");
      }
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left">
          {ticket.createdAt?.toLocaleDateString("pt-br")}
        </td>
        <td>
          <span
            className={`px-2 py-1 rounded text-white ${
              status === "Fechado" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {status}
          </span>
        </td>
        <td className="text-left">
          <button
            className="mr-3"
            onClick={handleChangeStatus}
            disabled={status === "Fechado"}
          >
            <FiCheckSquare size={24} color="#51525195" />
          </button>
          <button className="mr-3">
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
