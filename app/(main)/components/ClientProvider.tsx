"use client";

import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
