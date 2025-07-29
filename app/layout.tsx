import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./components/ClientProvider";


export const metadata: Metadata = {
  title: "Ezinne Kalu",
  description: "My Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
