"use client";

import Navbar from "./Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
