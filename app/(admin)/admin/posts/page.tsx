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
import { ThreeCircles } from "react-loader-spinner";

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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/posts?search=${search}&page=${page}`, {
            withCredentials: true,
          }
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
        toast.error(message);
      }
    };

    fetchPosts();
  }, [search, page]);

  const handleDelete = async (id: any) => {
    try {
      // const token = Cookies.get("adminToken");
      // if (!token) {
      //   toast.error("No token found");
      //   return;
      // }

      await axios.delete(`https://ezinne-api.onrender.com/api/v1/posts/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true,
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
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setPage(1); // reset to page 1 when searching
                setSearch(e.target.value);
              }}
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px]"
            />
          </div>
        </div>
        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center">
              <ThreeCircles
                visible={true}
                height="50"
                width="50"
                color="#000000"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-[6px] text-[#4A5568]">
                  <th className="lg:px-24 px-16 py-2 whitespace-nowra">
                    Title
                  </th>
                  <th className="lg:px-16 px-8 py-2 whitespace-nowrap">
                    Image
                  </th>
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
                          width={120}
                          height={80}
                          src={item.image}
                          alt="img"
                          className="h-[80px] w-[120px] object-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="lg:px-16 px-8 py-3">
                      <h1 className="text-md text-[#4A5568]">
                        {item.content.split(" ").slice(0, 25).join(" ") + "..."}
                      </h1>
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
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
