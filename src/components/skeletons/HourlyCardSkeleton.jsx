import React, { memo } from "react";
import { IoIosArrowDown } from "react-icons/io";

const HourlyCardSkeleton = () => {
  return (
    <div className="relative flex w-[95%] flex-col gap-4">
      <div className="relative flex h-[5rem] w-full items-center justify-around overflow-hidden rounded-xl rounded-br-none border-l border-t border-black/10 bg-white py-[2%] shadow-md shadow-black/20 dark:border-white/5 dark:bg-[#1d1d1d] dark:text-white/90 dark:shadow-black">
        {/* Day Name Placeholder */}
        <div className="absolute left-0 top-0 h-4 w-[32%] rounded-br-2xl bg-black/15 dark:bg-white/15"></div>

        {/* Image Placeholder */}
        <div className="mt-2 size-[2.5rem] animate-pulse rounded-full bg-black/10 dark:bg-white/10"></div>

        {/* Description Placeholder */}
        <div className="flex h-full animate-pulse flex-col items-start justify-center gap-1">
          <div className="h-1 w-24 rounded bg-black/20 dark:bg-white/15"></div>
          <div className="h-1 w-9 rounded bg-black/20 dark:bg-white/15"></div>
        </div>

        {/* Temperature/Rain Placeholder */}
        <div className="flex h-full animate-pulse flex-col items-center justify-center gap-3">
          {/*Temperature*/}
          <div className="h-5 w-10 rounded bg-black/20 dark:bg-white/15"></div>
          {/*rain or min/max temp*/}
          <div className="flex animate-pulse flex-col items-start justify-center gap-1">
            <div className="h-1 w-16 rounded bg-black/20 dark:bg-white/15"></div>
            <div className="h-1 w-9 rounded bg-black/20 dark:bg-white/15"></div>
          </div>
        </div>
      </div>

      <button className="w-26 absolute -bottom-3 right-0 flex gap-2 rounded-bl-3xl rounded-br-2xl bg-white px-4 pb-0.5 text-xs font-[500] italic leading-3 shadow-md shadow-black/20 dark:bg-[#1d1d1d] dark:shadow-black">
        <div className="flex w-full items-center gap-1">
          More
          <IoIosArrowDown />
        </div>
      </button>
    </div>
  );
};

export default memo(HourlyCardSkeleton);
