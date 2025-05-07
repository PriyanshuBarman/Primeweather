import React, { memo, useState } from "react";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { useApiData } from "../context/ApiContext";
import { useSidebar } from "../context/SidebarContext";
import ForecastSunTimesSkeleton from "./skeletons/ForecastSunTimesSkeleton";

const ForecastSunTimes = ({ index }) => {
  const { isLoading, getDailyData } = useApiData();

  if (isLoading) return <ForecastSunTimesSkeleton />;

  const [activeTab, setActiveTab] = useState(false);
  const { sunRise, sunSet } = getDailyData(index);
  const toogle = () => {
    setActiveTab(!activeTab);
  };
  return (
    <div
      onClick={toogle}
      className="hover-scale-2 relative m-auto mb-5 flex h-[5.7rem] w-[95%] items-center justify-between overflow-x-hidden rounded-xl border-t border-black/20 bg-white px-3 text-lg text-black/80 shadow-md shadow-black/30 dark:border-white/30 dark:bg-black/20 dark:text-white dark:shadow-black md:h-[7rem]"
    >
      {/* Animated Underline */}
      <div
        className={`${!activeTab ? "translate-x-[80%]" : "right-[50%]"} absolute bottom-0 h-full w-[60%] -skew-x-12 rounded-lg bg-black/10 transition-all duration-200 ease-in-out dark:border-t dark:border-white/50 dark:bg-white/5 md:bg-gradient-to-b md:dark:bg-none`}
      ></div>

      {/* Sunrise*/}
      <div className="z-10 flex h-full w-[45%] cursor-pointer flex-col justify-center gap-3 pl-4 pt-[1%]">
        <h1 className="w-full rounded-md text-sm font-[600] italic md:text-lg">
          Sunrise
        </h1>
        <span className="relative bottom-3 right-2 flex w-full items-end justify-center gap-2 font-[600] dark:from-white dark:via-white/80 md:text-[1.4rem]">
          {sunRise}
          <GiSunrise className="h-full w-9 fill-orange-400 dark:fill-gray-300" />
        </span>
      </div>

      {/* Sunset*/}
      <div className="z-10 flex h-full w-[45%] cursor-pointer flex-col justify-center gap-3 pl-4 pt-[1%]">
        <h1 className="w-full rounded-md text-sm font-[600] italic md:text-lg">
          Sunset
        </h1>
        <span className="relative bottom-2 right-2 flex w-full items-center justify-center gap-2 font-[600] dark:from-white dark:via-white/80 md:text-[1.4rem]">
          {sunSet}
          <GiSunset className="h-full w-9 fill-orange-400 dark:fill-gray-300" />
        </span>
      </div>
    </div>
  );
};

export default memo(ForecastSunTimes);
