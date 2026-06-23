import { NextResponse } from "next/server";
import { auth, getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 401 },
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });

  if (findTicket) {
    return NextResponse.json(
      { error: "Cliente possui Chamado em aberto" },
      { status: 401 },
    );
  }
  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com Sucesso!" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed deleter user" }, { status: 401 });
  }
}

// Rota para deletar um cliente
export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente criado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar cliente", error },
      { status: 400 },
    );
  }
}
