import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketPlus",
  description: "Seu sistema de controle de tickets eficiente e intuitivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
