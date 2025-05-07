import React, { memo } from "react";
import MadeWithLove from "../components/skeletons/MadeWithLove";
import SocialsDesktop from "../components/SocialsDesktop";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col items-center gap-6 bg-white py-10 italic text-black/70 dark:bg-[#252525] dark:text-white/55 md:w-full">
      <SocialsDesktop />
      <div className="flex w-full justify-center text-center font-sans">
        Copyright © 2025
        <div className="items-cente ml-3 flex gap-3">
          <h1>Prime Weather</h1>
        </div>
      </div>
     
      <MadeWithLove />
    </footer>
  );
};

export default memo(Footer);
