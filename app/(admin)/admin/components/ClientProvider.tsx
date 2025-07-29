"use client";

import { ReactNode } from "react";

export default function ClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="bg-[#F2F2F2] w-full">{children}</div>;
}
