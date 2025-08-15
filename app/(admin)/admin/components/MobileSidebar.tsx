import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { closeSidebar } from "../store/mobileSidebarSlice";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import PostDropdown from "./posts/PostDropdown";
import TopicDropdown from "./topics/TopicDropdown";
import TipDropdown from "./tips/TipDropdown";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const MobileSidebar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.mobileSidebar.mobileSidebar);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
    console.log("sidebar closed");
  };

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
    <AnimatePresence>
      {sidebar && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white w-[300px] xl:hidden flex-col flex fixed top-2 bottom-2 left-3 rounded-xl shadow-lg z-10"
        >
          <div className="fixed h-[120px] w-[300px] flex items-center justify-between px-8">
            <h1 className="text-2xl font-semibold">Ezinne Kalu</h1>
            <FaXmark
              onClick={handleCloseSidebar}
              className="h-[30px] w-[30px] cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-start ml-8 mt-[130px] gap-4">
            <div className="flex items-center justify-between w-[230px]">
              <Link
                onClick={() => handleCloseSidebar()}
                href={"/admin"}
                className="flex flex-row items-center justify-between gap-8"
              >
                <MdSpaceDashboard className="h-[20px] w-[20px]" />
                <h1>Dashboard</h1>
              </Link>
            </div>
            <PostDropdown />
            <TopicDropdown />
            <TipDropdown />
            <button
              className="flex items-center gap-8 cursor-pointer w-[230px]"
              onClick={handleLogout}
            >
              <LuLogOut className="h-[20px] w-[20px]" />
              <h1>Logout</h1>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
