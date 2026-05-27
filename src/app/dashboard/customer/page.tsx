import { Container } from "@/components/container";
import { auth } from "@/lib/auth"; // <- era getServerSession
import { redirect } from "next/navigation";

export default async function Customer() {
  const session = await auth(); // <- faltava o await

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main>
        <div>
          <h1>Meus Clientes</h1>
        </div>
      </main>
    </Container>
  );
}
