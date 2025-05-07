import React, { memo } from "react";

const WeatherStatsSkeleton = () => {
  return (
    <div className="mb-2 mt-9 flex w-full items-center justify-center gap-4 px-5">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex h-[4.2rem] w-24 flex-col items-center justify-center gap-1 rounded-2xl bg-white/30 shadow-lg dark:bg-white/5 dark:shadow-black/40"
        >
          <div className="flex w-full animate-pulse items-center justify-center gap-1">
            <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-white/15"></div>{" "}
            {/* Icon Placeholder */}
            <div className="h-4 w-10 rounded bg-gray-300 dark:bg-white/15"></div>{" "}
            {/* Value Placeholder */}
            <div className="h-2 w-2 rounded-sm bg-gray-300 dark:bg-white/15"></div>{" "}
            {/* Unit Placeholder */}
          </div>
          <div className="mt-1 h-1.5 w-16 animate-pulse rounded bg-gray-300 dark:bg-white/15"></div>{" "}
          {/* Label Placeholder */}
        </div>
      ))}
    </div>
  );
};

export default memo(WeatherStatsSkeleton);
