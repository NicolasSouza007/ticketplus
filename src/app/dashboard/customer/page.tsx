import { Container } from "@/components/container";
import { auth } from "@/lib/auth"; // <- era getServerSession
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma";
import Link from "next/link";

export default async function Customer() {
  const session = await auth(); // <- faltava o await

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Novo Cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>
      </main>
    </Container>
  );
}
