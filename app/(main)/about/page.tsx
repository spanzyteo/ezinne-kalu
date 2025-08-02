'use client'
import Image from "next/image";
import React from "react";
import { useAppSelector } from "../store/hooks";

const page = () => {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  return (
    <div className="lg:ml-[360px] lg:py-16 px-10 lg:px-16">
      <h1
        className={`text-[30px] font-semibold ${darkMode ? "text-white" : ""}`}
      >
        whoami
      </h1>
      <Image
        height={337}
        width={450}
        src="/profile.jpg"
        alt=""
        className="object-cover w-[400px] md:max-w-[450px] h-[337.5px] lg:max-h-[337.5px] rounded-lg mt-8"
      />
      <div className="flex flex-col gap-4 mt-8">
        <h1
          className={`font-semibold text-[20px] ${
            darkMode ? "text-white" : ""
          }`}
        >
          Ezinne Kalu
        </h1>
        <p
          className={`font-extralight text-[18px] leading-relaxed ${
            darkMode ? "text-white" : ""
          }`}
        >
          I’m a Solo Founder, Bug Bounty Hunter, and startup Advisor who
          specializes in application security and AI. I’ve helped Fortune 500
          companies find vulnerabilities that could have cost them millions, and
          I’ve submitted over 1,000 vulnerabilities across Hackerone and
          Bugcrowd. I love helping secure the planet by building, breaking, and
          teaching.
        </p>
        <p
          className={`font-extralight text-[18px] leading-relaxed ${
            darkMode ? "text-white" : ""
          }`}
        >
          Email me if you are interested in AI consulting (implementation
          help/advice or AI security assesments). I’m also available for startup
          advising at high velocity startups that need a technical advisor who
          is well-networked, at the bleeding edge of AI and Security,
          passionate, involved, and has a wide range of knowledge.
        </p>
        <p
          className={`font-extralight text-[18px] leading-relaxed ${
            darkMode ? "text-white" : ""
          }`}
        >
          On a more personal level, I’m a Christian, husband, and father. I love
          most things in life, but I’m particularly fond of hacking, ai-art,
          running, podcasts, and keylime pie.
        </p>
        <div className="flex flex-col mt-2">
          <h1
            className={`font-semibold text-[30px] ${
              darkMode ? "text-gray-200" : "text-gray-700 "
            }`}
          >
            whereami
          </h1>
          <ul
            className={`list-disc list-inside space-y-2 ml-6 ${
              darkMode ? "text-white" : "text-gray-700 "
            }`}
          >
            <li>
              email: <strong>ezinnekalu@gmail.com</strong>
            </li>
            <li>
              twitter/x: <strong>ezinnekalu</strong>
            </li>
            <li>
              linkedIn: <strong>ezinne kalu</strong>
            </li>
            <li>
              hackerone: <strong>ezinnekalu</strong>
            </li>
          </ul>
        </div>
        <div className="flex flex-col mt-2">
          <h1
            className={`font-semibold text-[30px] ${
              darkMode ? "text-gray-200" : "text-gray-700 "
            }`}
          >
            affiliations
          </h1>
          <ul
            className={`list-disc list-inside space-y-2 ml-6 ${
              darkMode ? "text-white" : "text-gray-700 "
            }`}
          >
            <li>
              Ethiack: <strong>Advisor</strong>
            </li>
            <li>
              SPLX: <strong>Advisor</strong>
            </li>
            <li>
              Caido: <strong>Advisor</strong>
            </li>
            <li>
              HackerOne: <strong>Hacker Advisory Board Member</strong>
            </li>
            <li>
              Cornerstone Haiti: <strong>Board Member</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
