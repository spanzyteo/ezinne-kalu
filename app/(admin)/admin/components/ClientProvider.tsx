"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import { store } from "../store";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="bg-[#F2F2F2] w-full">
        <Sidebar />
        <MobileSidebar />
        <Header />
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Provider>
  );
}
