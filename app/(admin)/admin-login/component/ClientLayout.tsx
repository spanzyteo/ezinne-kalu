"use client";

import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
