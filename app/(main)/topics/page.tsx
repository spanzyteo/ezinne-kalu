import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="lg:ml-[360px] lg:py-16 px-10 lg:px-16">
      <h1 className="font-semibold text-[30px]">topics</h1>
      <div className="flex flex-col mt-10">
        <Link href={""} className="underline">hacking</Link>
        <Link href={""} className="underline">ai</Link>
        <Link href={""} className="underline">cybersecurity</Link>
        <Link href={""} className="underline">personal</Link>
      </div>
    </div>
  );
};

export default page;
