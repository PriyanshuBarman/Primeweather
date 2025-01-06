import React, { memo } from "react";

const PreviewCardSkeleton = () => {
  return (
    <div className="relative mb-4 m-auto mt-3 flex h-[17rem] w-[95%] flex-col items-center rounded-[1.5rem] bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg shadow-black/50 dark:from-[#161616] dark:to-[#474747] dark:shadow-black md:h-[320px] md:w-[550px]">
      <div className="absolute right-[7%] top-5 flex flex-col items-center justify-center gap-4 md:top-8">
        <span className="flex h-2 w-16 animate-pulse rounded-lg bg-white/75 dark:bg-white/20 md:w-20"></span>
        <span className="h-14 w-28 animate-pulse rounded-lg bg-white/75 dark:bg-white/20 md:h-20 md:w-40"></span>

        <span className="h-3 w-20 animate-pulse rounded-md bg-white/75 dark:bg-white/20 md:w-32"></span>
        <span className="flex h-5 w-16 animate-pulse rounded-lg bg-white/30 dark:bg-white/15 md:w-24"></span>
      </div>

      <div className="absolute bottom-[42%] left-[8%] flex w-[39%] flex-col gap-4">
        <span className="h-4 w-full animate-pulse rounded-md bg-white/75 dark:bg-white/20"></span>
        <span className="h-2.5 w-20 animate-pulse rounded-md bg-white/75 dark:bg-white/20"></span>
      </div>

      {/* WeatherStats Skeleton (using the existing component) */}
      <div className="absolute bottom-2 mb-2 mt-9 flex w-full items-center justify-center gap-4 px-5">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex h-[4.2rem] w-24 flex-col items-center justify-evenly rounded-2xl bg-white/10 shadow-lg dark:bg-white/5 dark:shadow-black/40 md:h-20 md:w-44"
          >
            <div className="mt-1 flex h-[30%] w-full animate-pulse items-center justify-center gap-1">
              {/* Icon Placeholder */}
              <div className="h-[90%] w-[20%] rounded-full bg-white/30 dark:bg-white/15"></div>{" "}
              {/* Value Placeholder */}
              <div className="h-[60%] w-[40%] rounded bg-white/30 dark:bg-white/15"></div>{" "}
              {/* Unit Placeholder */}
              <div className="h-[50%] w-[9%] rounded-sm bg-white/30 dark:bg-white/15"></div>{" "}
            </div>
            {/* Label Placeholder */}
            <div className="mt-1 h-[10%] w-[70%] animate-pulse rounded-sm bg-white/30 dark:bg-white/15"></div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(PreviewCardSkeleton);
