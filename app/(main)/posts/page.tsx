"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../store/hooks";

type PostsType = {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  topic: { name: string };
};

const Post = () => {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);
  const router = useRouter();
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/posts?search=${search}&page=${page}`
        );
        const { data, totalPages: pages } = response.data;
        setPosts(data);
        setTotalPages(pages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching posts";
        console.error(message);
      }
    };

    fetchPosts();
  }, [search, page]);
  return (
    <div className="lg:ml-[360px] lg:py-10">
      {loading ? (
        <div className="ml-10">
          <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color={`${darkMode ? "#FFFFFF" : "#000000"}`}
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          {posts.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col pb-10 pt-4 border-b ${
                darkMode ? "border-b-white" : ""
              }`}
            >
              <div className="px-10 lg:px-16 flex flex-col gap-3">
                <Link
                  href={`/posts/${item.id}`}
                  className={`font-semibold text-[32px] lg:text-[40px] leading-[40px] lg:leading-[50px] hover:underline hover:font-bold ${
                    darkMode ? "text-white" : "text-[#313131]"
                  }`}
                >
                  {item.title}
                </Link>
                <div className="flex items-center gap-3 text-[16px] md:text-[20px] leading-[24px] lg:leading-[30px]">
                  <h2
                    className={`${darkMode ? "text-white" : "text-[#767676]"}`}
                  >
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  <p className={`${darkMode ? "text-white" : ""}`}>•</p>
                  <h2 className={`${darkMode ? "text-white" : ""}`}>
                    {item.topic.name}
                  </h2>
                </div>
                <img
                  src={item.image}
                  className="rounded-[5px] w-[400px] h-[266px] object-cover"
                  alt=""
                />
                <div
                  className={`prose max-w-none ${darkMode ? "text-white" : ""}`}
                >
                  <ReactMarkdown>
                    {item.content.split(" ").slice(0, 40).join(" ") + "..."}
                  </ReactMarkdown>
                </div>
                <Link
                  href={`/posts/${item.id}`}
                  className={`hover:underline text-[16px] mt-2 ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  More...
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Post;
