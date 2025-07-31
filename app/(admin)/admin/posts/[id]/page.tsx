"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

type PostsType = {
  id: number;
  title: string;
  slug: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  topic: { name: string };
};

const PostId = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState<PostsType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/posts/${postId}`
        );

        const { data } = response.data;
        setPost(data);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching post";
        toast.error(message);
      }
    };
    if (postId) fetchPosts();
  }, [postId]);

  return (
    <div className="bg-white flex flex-col h-[100vh]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8 overflow-x-auto">
        {post ? (
          <>
            <div className="mt-4">
              <h1 className="font-semibold sm:text-xl text-lg">
                Post #{post.id}
              </h1>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Title</td>
                    <td className="p-2">{post.title}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Image </td>
                    <td className="p-2">
                      <img
                        src={post.image}
                        alt="Product Image"
                        className="w-[250px] h-32 object-cover rounded-md"
                      />
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Content</td>
                    <td className="p-2">{post.content}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-2">{post.createdAt}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-2">{post.updatedAt}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Topic</td>
                    <td className="p-2">{post.topic.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-gray-600 text-lg text-center mt-8">
            Post not found.
          </h1>
        )}
      </div>
    </div>
  );
};

export default PostId;
