import React from "react";
import WidgetSkeleton from "./WidgetSkeleton";

const WeatherHighlightsSkeleton = () => {
  return (
    <section className="relative mb-2 flex w-full flex-col items-center justify-center">
      <div className="inline-flex h-8 w-[93%] animate-pulse items-center justify-center rounded-full bg-black/5 shadow-md dark:bg-white/10 dark:shadow-black/80">
        <div className="flex h-full flex-col items-start justify-center gap-1">
          <div className="h-1 w-20 rounded bg-black/20 dark:bg-white/15"></div>
          <div className="h-1 w-6 rounded bg-black/20 dark:bg-white/15"></div>
        </div>
      </div>
      <div className="mt-5 flex w-full flex-wrap items-center justify-evenly gap-x-4 gap-y-4">
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
      </div>
    </section>
  );
};

export default WeatherHighlightsSkeleton;
