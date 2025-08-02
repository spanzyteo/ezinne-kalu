"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../store/hooks";

type TopicsType = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const Topic = () => {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);
  const [topics, setTopics] = useState<TopicsType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/topics?search=${search}&page=${page}`
        );
        const { data, totalPages: pages } = response.data;
        setTopics(data);
        setTotalPages(pages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching topics";
        console.error(message);
      }
    };

    fetchTopics();
  }, [search, page]);
  return (
    <div className="lg:ml-[360px] lg:py-16 px-10 lg:px-16">
      <h1
        className={`font-semibold text-[30px] ${
          darkMode ? "text-white" : ""
        }`}
      >
        topics
      </h1>
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
          {topics.map((item) => (
            <div key={item.id} className="flex flex-col mt-2">
              <Link
                href={`/topics/${item.id}`}
                className={`underline hover:font-semibold text-[16px] md:text-[20px] ${
                  darkMode ? "text-white" : ""
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Topic;
