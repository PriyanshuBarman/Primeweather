import React from "react";

function WeatherCardSkeleton() {
  return (
    <div className="relative flex h-[14.5rem] w-[97%] flex-col items-center overflow-hidden rounded-[1.7em] border-l bg-gradient-to-t from-blue-700 to-blue-400 text-white/95 shadow-lg shadow-black/50 dark:border-white/10 dark:bg-gradient-to-tr dark:from-[#151515] dark:to-[#464646] dark:shadow-black">
      <svg
        className="rounded-lg-t-3xl absolute bottom-0 rotate-[180deg] fill-sky-100 dark:fill-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        fill="#000"
      >
        <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
        <path
          d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
          opacity=".5"
        ></path>
        <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
        <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
      </svg>

      <div className="absolute right-[7%] top-5 flex flex-col items-center justify-center gap-5">
        <span className="flex h-2 w-16 animate-pulse rounded-lg bg-white/70 dark:bg-white/35"></span>
        <span className="h-16 w-28  animate-pulse rounded-lg bg-white/70 dark:bg-white/35"></span>

        <span className="h-3 w-20  animate-pulse rounded-md bg-white/70 dark:bg-white/35"></span>
        <span className="flex h-5  w-16 animate-pulse rounded-lg bg-white/30 dark:bg-white/15"></span>
      </div>

      <div className="absolute bottom-[23%] left-[8%] flex w-[39%] flex-col gap-4">
        <span className="h-4  w-full animate-pulse rounded-md bg-white/70 dark:bg-white/35"></span>
        <span className="h-2.5  w-20 animate-pulse rounded-md bg-white/70 dark:bg-white/35"></span>
      </div>
    </div>
  );
}

export default WeatherCardSkeleton;
