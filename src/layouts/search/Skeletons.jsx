import React, { memo } from "react";

function Skeletons({ isLoading }) {
  if (!isLoading) return;
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="Skeleton my-2 h-12 w-full animate-pulse rounded-md bg-black/5 dark:bg-white/5"
        ></div>
      ))}
    </>
  );
}

export default memo(Skeletons);
