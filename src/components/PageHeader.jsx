import React from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ name }) => {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  return (
    <header className="fixed top-0 z-30 flex h-11 w-full items-center justify-center bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-transparent dark:from-transparent dark:text-white">
      <h1 className="mt-1 text-lg font-[600] md:text-2xl">{name}</h1>
      <button
        onClick={handleBackClick}
        className="absolute left-[3%] rounded-full bg-black/60 p-1 text-white dark:bg-white/20"
      >
        <HiOutlineArrowSmLeft className="m-auto size-5 md:hidden" />
      </button>
    </header>
  );
};

export default PageHeader;
