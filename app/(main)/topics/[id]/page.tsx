"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import Link from "next/link";

type TopicType = {
  id: string;
  name: string;
  description: string;
  image: string;
  posts: { id: string; title: string; createdAt: string }[];
};

const TopicId = () => {
  const { id: topicId } = useParams();
  const [topic, setTopic] = useState<TopicType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/topics/${topicId}`
        );

        const { data } = response.data;
        setTopic(data);
        setLoading(false);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching topic";
        console.error(message);
        setLoading(false);
      }
    };
    if (topicId) fetchTopic();
  }, [topicId]);

  return (
    <div className="lg:ml-[360px] lg:py-10">
      {loading ? (
        <div className="ml-10">
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
        <>
          {topic ? (
            <div className="px-10 lg:px-16 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-[32px] lg:text-[40px] leading-[40px] lg:leading-[50px] text-[#313131]">
                  {topic.name}
                </h1>
                <img
                  src={topic.image}
                  className="rounded-[5px] w-[400px] h-[266px] object-cover"
                  alt=""
                />
                <h1 className="font-semibold text-[16px] lg:text-[20px] leading-[40px] lg:leading-[50px] text-[#515151]">
                  {topic.description}
                </h1>
                {topic.posts.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {topic.posts.map((post, index) => (
                      <Link
                        key={index}
                        href={`/posts/${post.id}`}
                        className="text-[25px] font-semibold hover:underline hover:font-bold"
                      >
                        {post.title} –{" "}
                        <span className="text-[15px] md:text-[18px] text-[#999] group">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default TopicId;
