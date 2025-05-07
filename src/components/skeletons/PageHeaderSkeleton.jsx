import React from "react";

const PageHeaderSkeleton = () => {
  return (
    <nav className="fixed top-0 z-10 flex h-11 w-full animate-pulse items-center justify-center bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-transparent dark:from-transparent dark:text-white md:w-[375px]">
      {/* Back btn Placeholder */}
      <div className="absolute left-[4%] size-7 rounded-full bg-black/20 dark:bg-white/15"></div>
      {/* Header Placeholder */}
      <div className="flex h-full flex-col items-start justify-center gap-1">
        <div className="h-1 w-32 rounded bg-black/20 dark:bg-white/15"></div>
        <div className="h-1 w-9 rounded bg-black/20 dark:bg-white/15"></div>
      </div>
    </nav>
  );
};

export default PageHeaderSkeleton;
