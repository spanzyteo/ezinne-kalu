"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";

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

const Posts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostsType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://ezinne-api.onrender.com/api/v1/posts"
        );
        const { data } = response.data;
        setPosts(data);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching posts";
        toast.error(message);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const token = Cookies.get("adminToken");
      if (!token) {
        toast.error("No token found");
        return;
      }

      await axios.delete(`https://ezinne-api.onrender.com/api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting post";
      toast.error(message);
    }
  };
  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-semibold sm:text-xl text-lg">Posts List</h1>
          <button
            onClick={() => router.push("/admin/add-new-posts")}
            className="px-7 py-2 bg-[#fab702] rounded-[5px] text-white text-[13px] font-semibold hover:text-black hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add Posts
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div></div>
          <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder=""
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px]"
            />
          </div>
        </div>
        <div className="mt-8 overflow-x-auto relative">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-200 rounded-[6px] text-[#4A5568]">
                <th className="lg:px-24 px-16 py-2 whitespace-nowra">Title</th>
                <th className="lg:px-16 px-8 py-2 whitespace-nowrap">Image</th>
                <th className="lg:px-40 px-16 py-2 whitespace-nowrap">
                  Content
                </th>
                <th className="lg:px-16 px-8 py-2 whitespace-nowrap">
                  Created At
                </th>
                <th className="lg:px-16 px-8 py-2 whitespace-nowrap">
                  Updated At
                </th>
                <th className="lg:px-24 px-16 py-2">Topic</th>
                <th className="lg:px-16 px-8 py-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item) => (
                <tr key={item.id} className="even:bg-white odd:bg-[#F2F2F2]">
                  <td className="lg:px-16 px-8 py-3">
                    <h1 className="text-md text-[#4A5568]">{item.title}</h1>
                  </td>
                  <td className="lg:px-16 px-8 py-3">
                    <div className="w-[80px] h-[80px] flex items-center justify-center rounded-xl">
                      <Image
                        width={60}
                        height={60}
                        src={item.image}
                        alt="img"
                        className="h-[60px] w-[60px] object-contain"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="lg:px-16 px-8 py-3">
                    <h1 className="text-md text-[#4A5568]">{item.content}</h1>
                  </td>
                  <td className="lg:px-16 px-8 py-3">
                    <h1 className="text-md text-[#4A5568]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </h1>
                  </td>
                  <td className="lg:px-16 px-8 py-3">
                    <h1 className="text-md text-[#4A5568]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </h1>
                  </td>
                  <td className="lg:px-16 px-8 py-3">
                    <h1 className="text-md text-[#4A5568]">
                      {item.topic.name}
                    </h1>
                  </td>
                  <td className="lg:px-16 px-8 py-3 flex mt-9 gap-3">
                    <Link href={`/admin/posts/${item.id}`}>
                      <MdOutlineRemoveRedEye className="h-[20px] w-[20px] text-purple-400" />
                    </Link>
                    <Link href={`/admin/posts/edit/${item.id}`}>
                      <MdOutlineEdit className="h-[20px] w-[20px] text-blue-400" />
                    </Link>
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(item.id)}
                      className="h-[20px] w-[20px] text-red-400 cursor-pointer hover:text-red-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Posts;
