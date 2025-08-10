"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPost } from "react-icons/bs";
import { MdTopic } from "react-icons/md";
import { RiChat3Line} from "react-icons/ri";

type PostsType = {
  totalPosts: number;
};

type TopicType = {
  totalTopic: number;
};

type TipType = {
  totalTips: number;
};

const Dashboard = () => {
  const [posts, setPosts] = useState<PostsType | null>(null);
  const [topics, setTopics] = useState<TopicType | null>(null);
  const [tips, setTips] = useState<TipType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://ezinne-api.onrender.com/api/v1/posts"
        );
        const data = response.data;
        setPosts(data);
      } catch (error: any) {}
    };

    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          "https://ezinne-api.onrender.com/api/v1/topics"
        );
        const data = response.data;
        console.log(data);
        setTopics(data);
      } catch (error: any) {}
    };

    const fetchTips = async () => {
      try {
        const response = await axios.get(
          "https://ezinne-api.onrender.com/api/v1/tips"
        );
        const data = response.data;
        console.log(data);
        setTips(data);
      } catch (error: any) {}
    };

    fetchPosts();
    fetchTopic();
    fetchTips()
  }, []);
  return (
    <div className="bg-white flex flex-col pb-[5rem]">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 mt-8 xl:ml-[20rem] lg:gap-4 gap-4"
        data-testid="dashboard-container"
      >
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-black"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Posts</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {posts?.totalPosts}
              </h1>
            </div>
          </div>
          <div className="bg-gray-400 h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <BsFileEarmarkPost
              className="h-[30px] w-[30px]"
              data-testid="icon-revenue"
            />
          </div>
        </div>
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#747DC6]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Topics</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">
                {topics?.totalTopic}
              </h1>
            </div>
          </div>
          <div className="bg-[#747DC60D] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <MdTopic
              className="h-[30px] w-[30px] text-[#747DC6]"
              data-testid="icon-orders"
            />
          </div>
        </div>
        <div className="lg:w-[501px] w-[90%] h-[140px] bg-[#F2F2F2] rounded-xl mx-auto flex items-center justify-between px-7">
          <div className="flex flex-row items-center">
            <div className="w-[4px] h-[95px] bg-[#EF3F3E]"></div>
            <div className="flex flex-col ml-4 ">
              <h1 className="text-[#9A9A9A]">Total Tips</h1>
              <h1 className="text-[#4A5568] font-semibold text-2xl">{tips?.totalTips}</h1>
            </div>
          </div>
          <div className="bg-[#EF3F3E1A] h-[40px] w-[40px] flex items-center justify-center rounded-[7px]">
            <RiChat3Line
              className="h-[30px] w-[30px] text-[#EF3F3E]"
              data-testid="icon-products"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
