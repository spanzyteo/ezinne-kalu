import React from 'react'
import { useAppDispatch } from '../store/hooks';
import { openSidebar } from '../store/mobileSidebarSlice';
import { IoIosSearch, IoMdMenu } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
import Image from 'next/image';

const Header = () => {
  const dispatch = useAppDispatch();
  const handleOPenSidebar = () => {
    dispatch(openSidebar());
  };
  return (
    <div className="flex items-center justify-between pt-7 pb-7 lg:ml-[20rem] text-black">
      <div className="flex items-center">
        <IoMdMenu
          onClick={() => handleOPenSidebar()}
          className="lg:hidden block h-[40px] w-[40px] ml-4 mt-1 cursor-pointer"
        />
        <h1 className="text-2xl ml-4 lg:hidden block font-semibold">
          Ezinne Kalu
        </h1>
        <div className="w-[408px] relative ml-7 h-[46px] md:block hidden">
          <input
            type="text"
            placeholder="Search..."
            className="py-[6px] pl-[30px] w-full h-full rounded-xl focus:outline-none "
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#fab702] h-full w-[50px] rounded-r-xl flex items-center justify-center">
            <IoIosSearch className="h-[25px] w-[25px] text-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center mr-4 gap-4">
        <IoIosSearch className="h-[30px] w-[30px] md:hidden" />
        <Image
          src={"/profile.jpg"}
          alt="profile"
          height={50}
          width={50}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Header