import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeSidebar } from "../../store/mobileSidebarSlice";
import { toggleTopics } from "../../store/sidebarSlice";
import { BsBag } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const TopicDropdown = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleTopicsClick = () => {
    dispatch(toggleTopics());
  };
  return (
    <>
      <div
        onClick={() => handleTopicsClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <BsBag className="h-[20px] w-[20px]" />
          <h1>Topics</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.topics ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.topics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 mt- ml-14"
          >
            <Link href={"/admin/topics"} onClick={() => handleCloseSidebar()}>
              Topics
            </Link>
            <Link
              href={"/admin/add-new-topics"}
              onClick={() => handleCloseSidebar()}
            >
              Add New Topics
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopicDropdown;
