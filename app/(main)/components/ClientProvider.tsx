"use client";

import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../store";
import { useAppSelector } from "../store/hooks";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);
  const darkModeClass = darkMode ? "bg-[#000000]" : "bg-[#FFF]";

  return (
    <div className={`relative min-h-screen ${darkModeClass}`}>
      <Navbar />
      <main>{children}</main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InnerLayout>{children}</InnerLayout>
    </Provider>
  );
}
