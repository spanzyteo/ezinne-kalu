"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AddNewTopic = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("No File Chosen");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file.name);
      setImage(file);
    } else {
      setImageFile("No File chosen");
      setImage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "https://ezinne-api.onrender.com/api/v1/topics",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        toast.success("Topic Added Successfully");
        setLoading(false);
        setName("");
        setDescription("");
        setImage(null);
        setImageFile("No File Chosen");
      } else {
        toast.error("Failed to add topic");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred adding topic";
      toast.error(message);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="bg-white flex flex-col pb-[3rem]">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">Topic Information</h1>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Name</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Description</h1>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Image</h1>
            <div className="custom-file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label
                htmlFor="image"
                className="custom-file-label border border-gray-200 bg-[#F9F9F6] lg:w-[539px] h-[40px] focus:outline-none rounded-[5px] text-[#4A5568] flex items-center cursor-pointer"
              >
                <span className="file-label-text bg-gray-200 h-[40px] px-3 text-black flex items-center">
                  Choose File
                </span>
                <span className="file-name text-sm text-gray-500 ml-4">
                  {imageFile}
                </span>
              </label>
            </div>
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

export default AddNewTopic;
