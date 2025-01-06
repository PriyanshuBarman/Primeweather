import React, { memo } from "react";
import MadeWithLove from "./Skeletons/MadeWithLove";
import SocialsDesktop from "./SocialsDesktop";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col items-center gap-4 bg-white py-7 italic text-black/70 dark:bg-[#252525] dark:text-white/55 md:w-full">
      <SocialsDesktop />
      <MadeWithLove />

      <div className="flex w-full justify-center text-center font-sans">
        Copyright © 2025
        <div className="items-cente ml-3 flex gap-3">
          <h1>Prime Weather</h1>
          <img src="Logo.png" alt="" className="size-6 rounded-full" />
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
