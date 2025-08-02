import Image from "next/image";
import Link from "next/link";
import { IoMoonSharp } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleDarkMode } from "../store/darkModeSlice";
import { MdWbSunny } from "react-icons/md";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <div
      className={`lg:h-full lg:overflow-auto w-full lg:w-[360px] lg:border-r py-8 flex flex-col items-center lg:fixed  ${
        darkMode ? "border-r-white" : ""
      }`}
    >
      <div
        className={`flex flex-col items-center lg:px-10 py-8 w-full border-b  ${
          darkMode ? "border-b-white" : ""
        }`}
      >
        <Image
          width={120}
          height={180}
          src={"/profile.jpg"}
          alt="profile"
          className={`h-[120px] lg:h-[180px] w-[120px] lg:w-[180px] rounded-full border-3 ${
            darkMode ? "border-white" : "border-black"
          }  object-cover`}
        />
        <Link
          href={"/"}
          className={`intel-one-mono text-[40px] lg:text-[50px] leading-[62.5px] lg:text-left ${
            darkMode ? "text-white" : ""
          }`}
        >
          Ezinne Kalu
        </Link>
        <p
          className={`courier-font text-[22px] font-thin leading-[32px] ml-4 sm:ml-0  ${
            darkMode ? "text-white" : ""
          }`}
        >
          My thoughts on hacking, ai, faith, and more.
        </p>
      </div>
      <div
        className={`flex flex-col lg:px-10 w-full border-b items-center lg:items-start py-6 gap-1  ${
          darkMode ? "border-b-white" : ""
        }`}
      >
        <Link
          href={"/posts"}
          className={`text-[20px] lg:text-left  ${
            darkMode ? "text-white" : ""
          }`}
        >
          posts
        </Link>
        <Link
          href={"/about"}
          className={`text-[20px] lg:text-left  ${
            darkMode ? "text-white" : ""
          }`}
        >
          whoami
        </Link>
        <Link
          href={"/tips"}
          className={`text-[20px] lg:text-left  ${
            darkMode ? "text-white" : ""
          }`}
        >
          tips
        </Link>
        <Link
          href={"/topics"}
          className={`text-[20px] lg:text-left  ${
            darkMode ? "text-white" : ""
          }`}
        >
          topics
        </Link>
      </div>
      <div className="flex flex-col lg:px-10 w-full py-6 gap-2">
        <div className="flex gap-3 justify-center lg:justify-normal">
          <MdSearch
            className={`h-[30px] w-[30px]  ${darkMode ? "text-white" : ""}`}
          />
          {darkMode ? (
            <MdWbSunny
              className="h-[30px] w-[30px] cursor-pointer text-[#FFF]"
              onClick={handleDarkMode}
            />
          ) : (
            <IoMoonSharp
              className="h-[30px] w-[30px] cursor-pointer"
              onClick={handleDarkMode}
            />
          )}
        </div>
        <h1
          className={`hidden lg:inline-block text-[20px]  ${
            darkMode ? "text-white" : ""
          }`}
        >
          © 2025 rez0.
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
