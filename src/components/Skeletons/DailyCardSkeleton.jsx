import React from 'react'

const DailyCardSkeleton = () => {
  return (
    <div className="relative flex h-[80px] w-[92%] cursor-pointer items-center justify-around overflow-hidden rounded-xl border-l border-t border-black/10 from-blue-100 to-blue-500 py-[2%] pr-6 shadow-md shadow-black/20 dark:border-white/5 dark:bg-[#1d1d1d] dark:text-white/90 dark:shadow-black md:h-[83px] md:w-full md:bg-gradient-to-br md:text-white md:dark:bg-none">
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
      </div>{" "}
    </div>
  </div>
  )
}

export default DailyCardSkeleton