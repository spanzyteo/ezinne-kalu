import Link from "next/link";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import PostSidebarSection from "./posts/PostSidebarSection";
import TopicSidebarSection from "./topics/TopicSidebar";
import TipSidebarSection from "./tips/TipSidebarSection";


const Sidebar = () => {
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
