import React from "react";

export default function SunriseSunsetSkeleton() {
  return (
    <div className="relative flex h-[160px] mt-7 w-[90%] animate-pulse flex-col items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md shadow-black/30 dark:bg-[#2d2d2d] dark:shadow-black md:h-[190px] ">
      <div className="absolute left-0 top-0 h-4 w-[35%] rounded-br-3xl bg-black/30 px-4 pt-0.5 dark:bg-white/30 md:h-5 shadow-sm shadow-black/30 dark:shadow-black"></div>
    </div>
  );
}
