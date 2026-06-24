import { Container } from "@/components/container";
import { auth } from "@/lib/auth"; // <- era getServerSession
import { redirect } from "next/navigation";
import { TicketItem } from "@/app/dashboard/components/ticket";
import Link from "next/link";
import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await auth(); // <- faltava o await

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: {},
    },
    include: {
      customer: true,
    },
  });
  console.log(tickets);

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className=" bg-blue-500 px-4 py-1 rouded text-white"
          >
            Novo Chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font medium text-left pl-2">Cliente</th>
              <th className="font medium text-left">Data Chamado</th>
              <th className="font medium text-left">Status</th>
              <th className="font medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="px-2 md:px-0 text-gray-600">
            Nenhum ticket aberto foi encontrado
          </h1>
        )}
      </main>
    </Container>
  );
}
