import Image from "next/image";
import Link from "next/link";
import { IoMoonSharp } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="lg:h-full lg:overflow-auto w-full lg:w-[360px] lg:border-r py-8 flex flex-col items-center lg:fixed">
      <div className="flex flex-col items-center lg:px-10 py-8 w-full border-b">
        <Image
          width={120}
          height={180}
          src={"/profile.jpg"}
          alt="profile"
          className="h-[120px] lg:h-[180px] w-[120px] lg:w-[180px] rounded-full border-3 border-black object-cover"
        />
        <Link href={'/'} className="intel-one-mono text-[40px] lg:text-[50px] leading-[62.5px] lg:text-left">
          Ezinne Kalu
        </Link>
        <p className="courier-font text-[22px] font-thin leading-[32px] ml-4 sm:ml-0">
          My thoughts on hacking, ai, faith, and more.
        </p>
      </div>
      <div className="flex flex-col lg:px-10 w-full border-b items-center lg:items-start py-6 gap-1">
        <Link href={"/posts"} className="text-[20px] lg:text-left">
          posts
        </Link>
        <Link href={"/about"} className="text-[20px] lg:text-left">
          whoami
        </Link>
        <Link href={"/tips"} className="text-[20px] lg:text-left">
          tips
        </Link>
        <Link href={"/topics"} className="text-[20px] lg:text-left">
          topics
        </Link>
      </div>
      <div className="flex flex-col lg:px-10 w-full py-6 gap-2">
        <div className="flex gap-3 justify-center lg:justify-normal">
          <MdSearch className="h-[30px] w-[30px]" />
          <IoMoonSharp className="h-[30px] w-[30px]" />
        </div>
        <h1 className="hidden lg:inline-block text-[20px]">© 2025 rez0.</h1>
      </div>
    </div>
  );
};

export default Navbar;
