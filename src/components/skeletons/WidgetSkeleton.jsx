import React from "react";

export default function WidgetSkeleton() {
  return (
    <div className="flex h-[120px] w-[148px] md:h-[109px] md:w-[150px] animate-pulse flex-col rounded-2xl rounded-tl-md bg-white/25 pb-5 pr-4 pt-2 shadow-[3px_5px_5px_.2px] shadow-black/30 dark:bg-black/15 dark:shadow-black">
      <div className="w-full">
        <div className="flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent via-black/5 to-black/10 pl-3 text-start shadow-[0px_1px_1px_0px] shadow-black/20 dark:via-white/15 dark:to-white/15 dark:shadow-black"></div>
      </div>

      <div className="flex h-full w-full items-end justify-center gap-4">
        <div className="h-9 w-9 rounded-md bg-black/15 dark:bg-white/15"></div>

        <div className="mb-2 ml-1 h-1.5 w-12 rounded-sm bg-black/15 dark:bg-white/15"></div>
      </div>
    </div>
  );
}
