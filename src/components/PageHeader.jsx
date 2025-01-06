import React from "react";
import { MdArrowCircleLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ name }) => {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  return (
    <header className="fixed top-0 z-10 flex h-11 w-full items-center justify-center bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-transparent dark:from-transparent dark:text-white">
      <h1 className="mt-1 text-lg font-[600] md:text-2xl">{name}</h1>
      <button
        onClick={handleBackClick}
        className="absolute left-[3%] h-[75%] w-[9%] rounded-md text-black/70 dark:text-white/60"
      >
        <MdArrowCircleLeft size={30} className="md:hidden" />
      </button>
    </header>
  );
};

export default PageHeader;
