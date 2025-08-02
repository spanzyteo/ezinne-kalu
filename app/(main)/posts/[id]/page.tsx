"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../../store/hooks";

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
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);
  const { id: postId } = useParams();
  const [post, setPost] = useState<PostsType | null>(null);
  const [similarPosts, setSimilarPosts] = useState<PostsType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch the current blog post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/posts/${postId}`
        );
        setPost(response.data.data);
        setLoading(false);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching post";
        console.error(message);
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  // Fetch all posts to get 3 similar ones
  useEffect(() => {
    const fetchSimilarPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://ezinne-api.onrender.com/api/v1/posts"
        );
        const allPosts: PostsType[] = response.data.data;

        // Filter out the current post
        const otherPosts = allPosts.filter((p) => p.id.toString() !== postId);

        // Shuffle and pick 3 random ones
        const shuffled = otherPosts.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setSimilarPosts(selected);
        setLoading(false);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching post";
        toast.error(message);
        setLoading(false);
      }
    };

    if (postId) fetchSimilarPosts();
  }, [postId]);

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
          {post ? (
            <div className="px-10 lg:px-16 flex flex-col gap-8">
              {/* Main blog post */}
              <div className="flex flex-col gap-3">
                <h1
                  className={`font-semibold text-[32px] lg:text-[40px] leading-[40px] lg:leading-[50px] ${
                    darkMode ? "text-white" : "text-[#313131]"
                  }`}
                >
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 text-[16px] md:text-[20px] leading-[24px] lg:leading-[30px]">
                  <h2
                    className={` ${darkMode ? "text-white" : "text-[#767676]"}`}
                  >
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  <p>•</p>
                  <h2 className={`${darkMode ? "text-white" : ""}`}>
                    {post.topic.name}
                  </h2>
                </div>
                <img
                  src={post.image}
                  className="rounded-[5px] w-[400px] h-[266px] object-cover"
                  alt=""
                />
                <div
                  className={`prose max-w-none ${darkMode ? "text-white" : ""}`}
                >
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </div>

              {/* Similar Posts */}
              {similarPosts.length > 0 && (
                <div className="mt-12">
                  <h2
                    className={`text-2xl font-semibold mb-6 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    Similar Blogs
                  </h2>
                  <div className={`grid md:grid-cols-3 gap-8 `}>
                    {similarPosts.map((similar) => (
                      <Link href={`/posts/${similar.id}`} key={similar.id}>
                        <div
                          className={`rounded-lg p-4 shadow-sm hover:shadow-md transition h-full ${
                            darkMode ? "bg-gray-900" : ""
                          }`}
                        >
                          <img
                            src={similar.image}
                            className="w-full h-[200px] object-cover rounded-md mb-4"
                            alt=""
                          />
                          <h3
                            className={`text-lg font-bold mb-2 ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {similar.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-white" : "text-gray-600"
                            }`}
                          >
                            {similar.content.split(" ").slice(0, 20).join(" ")}
                            ...
                          </p>
                          <p
                            className={`mt-2 hover:underline text-sm ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            Read More
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <h1 className="px-10">Post not found</h1>
          )}
        </>
      )}
    </div>
  );
};

export default PostId;
