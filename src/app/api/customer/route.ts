import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

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
