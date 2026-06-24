import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID do ticket ausente" },
      { status: 400 },
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
      userId: session.user.id,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Falha na atualização" },
      { status: 400 },
    );
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "Fechado",
      },
    });

    revalidatePath("/dashboard");

    return NextResponse.json(
      { message: "Chamado Atualizado" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao atualizar chamado" },
      { status: 500 },
    );
  }
}
