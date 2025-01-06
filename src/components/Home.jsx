import React, { lazy, Suspense } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import PreviewCard from "./PreviewCard";
import Sidebar from "./Sidebar";
import DailyForecastSkeleton from "./Skeletons/DailyForecastSkeleton";
import HighlightsSkeleton from "./Skeletons/HighlightsSkeleton";
import HourlyForecastSkeleton from "./Skeletons/HourlyForecastSkeleton";
import SunriseSunset from "./SunriseSunset";

const DailyForecast = lazy(() => import("./DailyForecast"));
const HourlyForecast = lazy(() => import("./HourlyForecast"));
const Highlights = lazy(() => import("./Highlights"));
const Home = () => {
  const isDeskTop = useMediaQuery({ minWidth: 768 });
  return (
    <div className="container flex flex-col bg-[#ffffff] pb-20 dark:bg-[#1d1d1d] md:gap-2 md:overflow-y-hidden md:bg-[#fafafa] md:pb-5 md:dark:bg-[#1b1b1b]">
      <div className="relative flex flex-col items-center gap-4 text-black dark:text-white md:flex-row md:items-start md:justify-around md:gap-5 md:pl-20 md:pt-10">
        <Navbar />
        {!isDeskTop && <Sidebar />}

        <div className="mt-24 flex w-full flex-col items-center md:mt-9 md:w-[37%] md:space-y-9">
          <PreviewCard />
          <Suspense fallback={<HourlyForecastSkeleton />}>
            <div className="hover-scale-2 mt-6 w-full md:rounded-3xl md:bg-white md:px-2 md:py-5 md:shadow-md md:shadow-black/15 md:dark:bg-[#1c1c1c] md:dark:shadow-black">
              <HourlyForecast />
            </div>
          </Suspense>
        </div>
        <div className="hover-scale-2 flex h-full flex-col items-center pb-5 dark:bg-transparent md:mt-6 md:flex md:w-[29%] md:flex-col md:items-center md:rounded-3xl md:bg-white md:shadow-md">
          <div className="rounded-3xl md:dark:bg-[#1c1c1c] md:dark:pb-4 md:dark:shadow-md md:dark:shadow-black">
            <Suspense fallback={<HighlightsSkeleton />}>
              <Highlights />
            </Suspense>
          </div>
          <SunriseSunset />
        </div>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast />
        </Suspense>
      </div>

      {!isDeskTop && (
        <NavLink
          to={"/forecast/hourly"}
          className="m-auto mt-10 flex h-9 w-52 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 text-sm font-[500] italic text-white shadow-md shadow-black/30 dark:bg-blue-600 dark:shadow-black"
        >
          Hourly Forecast
          <AiOutlineDoubleRight size={15} />
        </NavLink>
      )}
    </div>
  );
};

export default Home;
