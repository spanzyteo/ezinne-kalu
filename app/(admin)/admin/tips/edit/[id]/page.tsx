"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const EditTipId = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/tips/${id}`
        );

        const { data } = response.data;
        setTitle(data.title);
        setDescription(data.description);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tips";
        toast.error(message);
        return;
      }
    };

    fetchTip();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const token = Cookies.get("adminToken");

      const response = await axios.put(
        `https://ezinne-api.onrender.com/api/v1/tips/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Tip updated successfully");
        router.push("/admin/tips");
      } else {
        toast.error("Failed to update tip");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred while updating tip";
      toast.error(message);
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">Tip Information</h1>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Title</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Description</h1>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#fab702] flex items-center justify-center h-[40px] w-[140px] text-white rounded-[5px] mb-10 text-[14px] font-semibold xl:ml-[27rem] mx-auto hover:text-black hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditTipId;
