import React from "react";
import PageHeaderSkeleton from "./PageHeaderSkeleton";
import { useMediaQuery } from "react-responsive";
import ForecastSunTimesSkeleton from "./ForecastSunTimesSkeleton";
import MadeWithLove from "./MadeWithLove";
import WeatherHighlightsSkeleton from "./WeatherHighlightsSkeleton";
import PreviewCardSkeleton from "./PreviewCardSkeleton";

const ForecastSkeleton = () => {
  const isDeskTop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="w-full bg-white dark:bg-[#272727] md:flex md:h-full md:pl-28">
      <div className="container flex h-full w-full flex-col items-center justify-center gap-y-5 pt-10 md:w-[80%]">
        {isDeskTop ? (
          <div className="absolute top-16 flex w-[15%] flex-col items-start justify-center gap-0.5">
            <div className="h-[0.25rem] w-full rounded-sm bg-black/15 dark:bg-white/15"></div>
            <div className="h-1 w-8 rounded-sm bg-black/15 dark:bg-white/15"></div>
          </div>
        ) : (
          <PageHeaderSkeleton />
        )}
        <div className="h-50 mt-4 flex w-full animate-pulse gap-2 pl-3 pr-2 md:mt-5 md:gap-10">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div
              key={idx}
              className="relative flex h-[6.7rem] w-[4rem] shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.7em] px-3 shadow-[1.5px_1px_2px_0px] shadow-black/40 dark:shadow-black md:h-[5.4rem] md:w-44 md:px-5"
            >
              {/* Day Placeholder */}
              <div className="flex w-full flex-col items-start justify-center gap-0.5">
                <div className="h-[0.25rem] w-full rounded-sm bg-black/15 dark:bg-white/15"></div>
                <div className="h-1 w-3 rounded-sm bg-black/15 dark:bg-white/15"></div>
              </div>
              {/* Image Placeholder */}
              <div className="h-[25%] w-[89%] rounded-full bg-black/5 dark:bg-white/10"></div>

              {/* Temperature Placeholder */}
              <div className="h-[0.5rem] w-6 rounded-sm bg-black/15 dark:bg-white/15"></div>
            </div>
          ))}
        </div>

        <div className="w-full space-y-10 md:flex md:h-[75%] md:flex-row md:items-center md:justify-around md:pb-5">
          <div className="md:h-full md:space-y-10">
            <PreviewCardSkeleton />
            {isDeskTop && <ForecastSunTimesSkeleton />}
          </div>
          <div className="rounded-3xl md:h-[91%] md:w-[40%] md:pt-2 md:shadow-md md:dark:bg-[#1c1c1c] md:dark:shadow-md md:dark:shadow-black">
            <WeatherHighlightsSkeleton />
          </div>
        </div>
        {!isDeskTop && <ForecastSunTimesSkeleton />}
      </div>
      {isDeskTop ? (
        <div className="flex h-screen w-[20%] items-center justify-center">
          <span className="text-center text-2xl font-[500] text-dark/90 dark:text-white/80">
            Fetching Data... .
          </span>
        </div>
      ) : (
        <MadeWithLove />
      )}
    </div>
  );
};

export default ForecastSkeleton;
