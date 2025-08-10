import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTips } from "../../store/sidebarSlice";
import { RiChat3Line } from "react-icons/ri";

const TipSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleTipClick = () => {
    dispatch(toggleTips());
  };
  return (
    <>
      <div
        onClick={() => handleTipClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <RiChat3Line className="h-[20px] w-[20px]" />
          <h1>Tips</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.tips ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.tips && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col gap-4 mt-2 ml-14"
          >
            <Link href={"/admin/tips"}>Tips</Link>
            <Link href={"/admin/add-new-tips"}>Add New Tips</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TipSidebarSection;
