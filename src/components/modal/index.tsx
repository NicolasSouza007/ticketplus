"use client";
import { useContext, useRef, MouseEvent } from "react";
import { ModalContext } from "@/providers/modal";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50"
      onClick={handleModalClick}
    >
      <div
        ref={modalRef}
        className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-4 rounded"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
          <button
            className="bg-red-500 px-2 py-1 text-white rounded"
            onClick={handleModalVisible}
          >
            Fechar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <h2 className="font-bold">Titulo:</h2>
          <p>{ticket?.ticket.name}</p>
        </div>

        <div className="mb-3">
          <h2 className="font-bold">Descrição:</h2>
          <p>{ticket?.ticket.description}</p>
        </div>
        <div className="w-full border-b-[1.5px] my-4">
          <h1 className="font-bold text-lg mb-4">Detalhes do Cliente</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <h2 className="font-bold">Nome:</h2>
          <p>{ticket?.customer?.name}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <h2 className="font-bold">telefone:</h2>
          <p>{ticket?.customer?.phone}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <h2 className="font-bold">E-mail:</h2>
          <p>{ticket?.customer?.email}</p>
        </div>
        {ticket?.customer?.address && (
          <div className="flex flex-wrap gap-2 mb-3">
            <h2 className="font-bold">Endereço:</h2>
            <p>{ticket.customer.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}
