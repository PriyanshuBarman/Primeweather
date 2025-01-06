import React, { memo } from "react";

const ForecastSunTimesSkeleton = () => {
  return (
    <div className="relative m-auto flex h-[5.7rem] w-[95%] animate-pulse items-center justify-between overflow-x-hidden rounded-xl border-t border-black/20 bg-white px-3 shadow-md shadow-black/30 dark:border-white/30 dark:bg-black/20 dark:shadow-black md:h-[7rem]">
      {/* Animated Underline Placeholder */}
      <div className="absolute bottom-0 h-full w-[60%] translate-x-[80%] -skew-x-12 rounded-lg bg-black/10 dark:bg-white/5"></div>

      {/* Sunrise Placeholder */}
      <div className="z-10 flex h-full w-[45%] flex-col justify-center gap-3 pl-4">
        {/* Sunrise Label */}
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="h-1.5 w-20 rounded-sm bg-black/20 dark:bg-white/15"></div>
          <div className="h-1.5 w-6 rounded-sm bg-black/20 dark:bg-white/15"></div>
        </div>

        <div className="flex items-center justify-start gap-5">
          {/* Sunrise Time */}
          <div className="h-4 w-16 rounded bg-black/20 dark:bg-white/15 md:h-6 md:w-28"></div>{" "}
          {/* Sunrise Icon */}
          <div className="h-6 w-6 rounded-full bg-black/20 dark:bg-white/15"></div>{" "}
        </div>
      </div>

      {/* Sunset Placeholder */}
      <div className="z-10 flex h-full w-[45%] flex-col justify-center gap-3 pl-4">
        {/* Sunset Label */}
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="h-1.5 w-20 rounded-sm bg-black/20 dark:bg-white/15"></div>
          <div className="h-1.5 w-6 rounded-sm bg-black/20 dark:bg-white/15"></div>
        </div>{" "}
        <div className="flex items-center justify-start gap-5">
          {/* Sunset Time */}
          <div className="h-4 w-16 rounded bg-black/20 dark:bg-white/15 md:h-6 md:w-28"></div>{" "}
          {/* Sunset Icon */}
          <div className="h-6 w-6 rounded-full bg-black/20 dark:bg-white/15"></div>{" "}
        </div>
      </div>
    </div>
  );
};

export default memo(ForecastSunTimesSkeleton);
