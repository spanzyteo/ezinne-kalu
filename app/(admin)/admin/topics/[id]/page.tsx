'use client'
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TopicType = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const page = () => {
  const { id: topicId } = useParams();
  const [topic, setTopic] = useState<TopicType | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/topics/${topicId}`
        );

        const { data } = response.data;
        setTopic(data);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching topic";
        toast.error(message);
      }
    };
    if (topicId) fetchTopic();
  }, [topicId]);

  return (
    <div className="bg-white flex flex-col h-[100vh]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8 overflow-x-auto">
        {topic ? (
          <>
            <div className="mt-4">
              <h1 className="font-semibold sm:text-xl text-lg">
                Topic #{topic.id}
              </h1>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Name</td>
                    <td className="p-2">{topic.name}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">
                      Description
                    </td>
                    <td className="p-2">{topic.description}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Image </td>
                    <td className="p-2">
                      <img
                        src={topic.image}
                        alt="Product Image"
                        className="w-[250px] h-32 object-cover rounded-md"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-gray-600 text-lg text-center mt-8">
            Topic not found.
          </h1>
        )}
      </div>
    </div>
  );
};

export default page;
