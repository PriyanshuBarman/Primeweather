import React from "react";
import DailyCardSkeleton from "./DailyCardSkeleton";

const DailyForecastSkeleton = () => {
  return (
    <section className="mt-3 flex w-full flex-col items-center justify-center gap-4 dark:bg-[#1c1c1c] md:mt-7 md:w-[25%] md:gap-6 md:rounded-3xl md:bg-white md:px-6 md:pb-10 md:shadow-md md:dark:shadow-black">
      <div className="inline-flex h-8 w-[94%] animate-pulse items-center justify-center rounded-full bg-black/5 shadow-md dark:bg-white/10 dark:shadow-black/80 md:mt-3 md:h-7 md:bg-transparent md:shadow-none md:dark:bg-transparent">
        <div className="flex h-full flex-col items-start justify-center gap-1">
          <div className="h-1 w-20 rounded bg-black/20 dark:bg-white/15 md:w-28"></div>
          <div className="h-1 w-6 rounded bg-black/20 dark:bg-white/15 md:w-10"></div>
        </div>
      </div>

      {[1, 2, 3, 4, 5].map((idx) => (
        <DailyCardSkeleton key={idx} />
      ))}
    </section>
  );
};

export default DailyForecastSkeleton;
