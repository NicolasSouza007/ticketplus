import { Container } from "@/components/container";
import Link from "next/link";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const userId = session.user.id;

  const customers = await prismaClient.customer.findMany({
    where: {
      userId,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof customerId !== "string"
    ) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name,
        title: name,
        description,
        customerId,
        status: "Aberto",
        userId,
      },
    });

    redirect("/dashboard");
  }
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3 ">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-midium text-lg">
            primeiro nome do chamado
          </label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />

          <label className="mb-1 font-midium text-lg">
            Descrição do chamado
          </label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            type="text"
            placeholder="Fale sobre o chamado aqui..."
            required
            name="description"
          />

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-midium text-lg">Selecione</label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-blue-500 font-medium ">
                Cadastrar Cliente
              </span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disable:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
