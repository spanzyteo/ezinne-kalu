"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TipsType = {
  id: string;
  title: string;
  description: string;
};

const TipsId = () => {
  const { id: tipsId } = useParams();
  const [tip, setTips] = useState<TipsType | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/tips/${tipsId}`
        );

        const { data } = response.data;
        setTips(data);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tips";
        toast.error(message);
      }
    };
    if (tipsId) fetchTip();
  }, [tipsId]);
  return (
    <div className="bg-white flex flex-col h-[100vh]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8 overflow-x-auto">
        {tip ? (
          <>
            <div className="mt-4">
              <h1 className="font-semibold sm:text-xl text-lg">
                Tip #{tip.id}
              </h1>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">Title</td>
                    <td className="p-2">{tip.title}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-semibold bg-gray-200">
                      Description
                    </td>
                    <td className="p-2">{tip.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-gray-600 text-lg text-center mt-8">
            Tip not found.
          </h1>
        )}
      </div>
    </div>
  );
};

export default TipsId;
