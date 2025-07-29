import type { Metadata } from "next";
import '../../globals.css'
import ClientProvider from "./components/ClientProvider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ezinne kalu | Admin",
  description: "The admin panel for managing ezinne kalu's api service"
}

export default function RootLayout({
  children,
}: Readonly<{
  children:ReactNode
}>) {
  return (
    <ClientProvider>
      <main>{children}</main>
    </ClientProvider>
  )
}