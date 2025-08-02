"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useAppSelector } from "../store/hooks";

type TipsType = {
  id: string;
  title: string;
  description: string;
};

const answerAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.3 } },
};

const Tips = () => {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  const [tips, setTips] = useState<TipsType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleTips = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ezinne-api.onrender.com/api/v1/tips?search=${search}&page=${page}`
        );
        const { data, totalPages: pages } = response.data;
        setTips(data);
        setTotalPages(pages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tips";
        console.error(message);
      }
    };

    fetchTips();
  }, [search, page]);

  return (
    <div className="lg:ml-[360px] lg:py-10 px-10 lg:px-16">
      <h1
        className={`font-semibold text-[30px] ${
          darkMode ? "text-white" : ""
        }`}
      >
        tips
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
          {tips.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`flex p-4 justify-between items-start rounded-[1rem] shadow-lg mt-4 ${
                  darkMode ? "bg-gray-900" : ""
                }`}
              >
                <div className="flex flex-col items-start justify-center gap-2">
                  <h1
                    className={`text-[1.125rem] font-medium leading-normal lg:leading-[1.875rem] ${
                      darkMode ? "text-white" : "text-[#4B5563]"
                    }`}
                  >
                    {item.title}
                  </h1>
                  <AnimatePresence mode="wait" initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        variants={answerAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <p
                          className={`dm-sans text-[0.875rem] font-normal lg:leading-[2rem] ${
                            darkMode ? "text-white" : "text-[#4B5563]"
                          }`}
                        >
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={`h-[30px] w-[30px] cursor-pointer ${
                    darkMode ? "text-white" : ""
                  }`}
                  onClick={() => toggleTips(item.id)}
                >
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Tips;
