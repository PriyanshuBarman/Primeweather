import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialsDesktop = () => {
  return (
    <div className="flex h-auto w-full items-center justify-around px-[40%]">
      <div className="group relative">
        <a
          href="https://www.linkedin.com/in/priyanshubarman"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center rounded-full bg-white p-3 shadow-md transition-all ease-linear hover:scale-110 group-hover:bg-[#004eb5] group-hover:text-white dark:bg-white/10"
          aria-label="Visit my LinkedIn profile"
        >
          <FaLinkedinIn className="size-5" />
        </a>
        <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100">
          <div className="relative">
            <div className="whitespace-nowrap rounded-md bg-[#004eb5] px-4 py-2 text-sm font-[500] text-white">
              LinkedIn
            </div>
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#004eb5]"></div>
          </div>
        </div>
      </div>

      <div className="group relative">
        <a
          href="https://github.com/PriyanshuBarman"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center rounded-full bg-white p-3 shadow-md transition-all ease-linear hover:scale-110 group-hover:bg-[#171515] group-hover:text-white dark:bg-white/10 dark:group-hover:bg-white/15"
          aria-label="Visit my GitHub profile"
        >
          <FaGithub className="size-5" />
        </a>
        <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100">
          <div className="relative">
            <div className="whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-[500] text-white dark:bg-black">
              GitHub
            </div>
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black dark:border-t-black"></div>
          </div>
        </div>
      </div>
      <div className="group relative">
        <a
          href="https://t.me/PriyanshuWB"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center rounded-full bg-white p-3 shadow-md transition-all ease-linear hover:scale-110 group-hover:bg-[#2CA5E0] group-hover:text-white dark:bg-white/10"
          aria-label="Visit my Telegram profile"
        >
          <FaTelegramPlane className="size-5" />
        </a>
        <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100">
          <div className="relative">
            <div className="whitespace-nowrap rounded-md bg-[#2CA5E0] px-4 py-2 text-sm font-[500] text-white">
              Telegram
            </div>
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#2CA5E0]"></div>
          </div>
        </div>
      </div>

      <div className="group relative">
        <a
          href="https://x.com/Priyanshuwb"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center rounded-full bg-white p-3 shadow-md transition-all ease-linear hover:scale-110 group-hover:bg-black group-hover:text-white dark:bg-white/10"
          aria-label="Visit my Twitter profile"
        >
          <FaXTwitter className="size-5" />
        </a>
        <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100">
          <div className="relative">
            <div className="whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-[500] text-white">
              Twitter
            </div>
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialsDesktop;
