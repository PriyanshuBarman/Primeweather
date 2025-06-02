import React, { memo } from "react";
import MadeWithLove from "../components/skeletons/MadeWithLove";
import SocialsDesktop from "../components/SocialsDesktop";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col items-center gap-6 bg-white py-10 italic text-black/70 dark:bg-[#252525] dark:text-white/55 md:w-full">
      <MadeWithLove />
      <div className="flex w-full items-center justify-center gap-2 text-center font-sans">
        Copyright © 2025
        <h1 className="mt-0.5 font-oxanium font-[500]">Prime Weather</h1>
      </div>

      <SocialsDesktop />
    </footer>
  );
};

export default memo(Footer);
