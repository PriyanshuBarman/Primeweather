import React from "react";

export default function HourlyForecastSkeleton() {
  return (
    <div className="h-50 mb-4 w-full rounded-md">
      {/* Heading */}
      <div className="flex w-[95%] animate-pulse flex-wrap items-center justify-between gap-4 pl-5">
        <div className="flex w-24 md:w-32 flex-col items-start justify-center gap-1">
          <div className="h-1.5 w-full rounded-sm bg-black/10 dark:bg-white/15"></div>
          <div className="h-1 w-6 rounded-sm bg-black/10 dark:bg-white/15"></div>
        </div>
        <div className="flex w-12 md:w-20 flex-col items-start justify-center gap-0.5">
          <div className="h-1 w-full rounded-sm bg-black/10 dark:bg-white/15"></div>
          <div className="h-1 w-6  rounded-sm bg-black/10 dark:bg-white/15"></div>
        </div>
      </div>

      {/* Cards/Slides Container */}
      <div className="flex gap-4 overflow-hidden pb-3 pl-5 pt-4">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <div key={idx} className="relative md:h-[8.3rem]  md:w-[4.9rem] md:rounded-[2.2rem] shrink-0 flex h-[6.4rem] w-[3.8rem] animate-pulse flex-col items-center justify-center gap-4 md:gap-5 rounded-[1.7em] bg-[#fcfcfc] px-3 pt-1 shadow-[1.5px_1px_2px_0px] shadow-black/40 dark:bg-[#202020] dark:shadow-black">
            {/* Day Placeholder */}
            <div className="top-4 h-1 w-full rounded bg-black/10 dark:bg-white/15"></div>

            {/* Image Placeholder */}
            <div className="h-[27%] w-[90%] rounded-xl bg-black/10 dark:bg-white/15"></div>

            {/* Temperature Placeholder */}
            <div className="flex w-full flex-col items-start justify-center gap-0.5">
              <div className="h-1  w-full rounded-sm bg-black/10 dark:bg-white/15"></div>
              <div className="h-1 w-3 rounded-sm bg-black/10 dark:bg-white/15"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
