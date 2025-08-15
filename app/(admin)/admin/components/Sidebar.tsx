'use client'
import Link from "next/link";
import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import PostSidebarSection from "./posts/PostSidebarSection";
import TopicSidebarSection from "./topics/TopicSidebar";
import TipSidebarSection from "./tips/TipSidebarSection";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      const data = await response.data;

      if (response.status === 200 && data.success) {
        toast.success("Logged out successfully");
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminToken");

        router.push("/");
        router.refresh();
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-white fixed w-[300px] xl:flex flex-col hidden top-2 bottom-0 left-3 rounded-xl shadow-2xl z-50 overflow-y-auto">
        <div className=" h-[120px] w-[300px] flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Ezinne Kalu</h1>
        </div>
        <div className="flex flex-col items-start ml-8 gap-4">
          <div className="flex items-center justify-between w-[230px]">
            <Link
              href={"/admin"}
              className="flex flex-row items-center justify-between gap-8"
            >
              <MdSpaceDashboard className="h-[20px] w-[20px]" />
              <h1>Dashboard</h1>
            </Link>
          </div>
          <PostSidebarSection />
          <TopicSidebarSection />
          <TipSidebarSection />
          <button
            className="flex items-center gap-8 cursor-pointer w-[230px]"
            onClick={handleLogout}
          >
            <LuLogOut className="h-[20px] w-[20px]" />
            <h1>Logout</h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
