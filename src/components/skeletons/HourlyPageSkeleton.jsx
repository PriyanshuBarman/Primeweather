import React from "react";
import HourlyCardSkeleton from "./HourlyCardSkeleton";
import PageHeaderSkeleton from "./PageHeaderSkeleton";

const HourlyPageSkeleton = () => {
  const cardsArray = new Array(9).fill(0);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white dark:bg-[#1c1c1c]">
      <PageHeaderSkeleton />

      <div className="sticky top-0 z-20 mt-10 flex h-10 w-full animate-pulse justify-center px-9 pb-2 pt-2 text-center font-semibold italic backdrop-blur-xl md:top-12">
        <div className="flex h-full flex-col items-start justify-center gap-1">
          <div className="h-1 w-32 rounded bg-black/20 dark:bg-white/15"></div>
          <div className="h-1 w-9 rounded bg-black/20 dark:bg-white/15"></div>
        </div>
      </div>
      {/* Cards Container */}
      <div className="mt-3 flex h-full m-auto w-full flex-col items-center justify-center gap-6">
        {cardsArray.map((index) => (
          <HourlyCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default HourlyPageSkeleton;
