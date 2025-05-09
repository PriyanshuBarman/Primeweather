import React, { lazy, Suspense } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import PreviewCard from "../components/PreviewCard";
import DailyForecastSkeleton from "../components/skeletons/DailyForecastSkeleton";
import HourlyForecastSkeleton from "../components/skeletons/HourlyForecastSkeleton";
import WeatherHighlightsSkeleton from "../components/skeletons/WeatherHighlightsSkeleton";
import SunriseSunset from "../components/SunriseSunset";
import Sidebar from "../layouts/Sidebar";
import HourlyDetails from "../components/HourlyDetails";
import MadeWithLove from "../components/skeletons/MadeWithLove";

const DailyForecast = lazy(() => import("../components/DailyForecast"));
const HourlyForecast = lazy(() => import("../components/HourlyForecast"));
const WeatherHighlights = lazy(() => import("../components/WeatherHighlights"));
const Home = () => {
  const isDeskTop = useMediaQuery({ minWidth: 768 });
  return (
    <div className="flex flex-col bg-[#ffffff] pb-14 dark:bg-[#1d1d1d] md:gap-2 md:overflow-y-hidden md:bg-[#fafafa] md:pb-5 md:dark:bg-[#1b1b1b]">
      <div className="relative flex flex-col items-center gap-4 text-black dark:text-white xl:flex-row md:items-start md:justify-around md:gap-5 md:pl-20 md:pt-10">
        <Navbar />
        {!isDeskTop && <Sidebar />}

        <div className="mt-24 flex w-full flex-col items-center md:mt-9 xl:w-[37%] md:space-y-9">
          <PreviewCard />
          <Suspense fallback={<HourlyForecastSkeleton />}>
            <div className="hover-scale-2 mt-6 w-full md:rounded-3xl md:bg-white md:px-2 md:py-5 md:shadow-md md:shadow-black/15 md:dark:border-t md:dark:border-white/40 md:dark:bg-[#1c1c1c] md:dark:shadow-black">
              <HourlyForecast />
            </div>
          </Suspense>
        </div>
        <div className="hover-scale-2 flex h-full flex-col items-center bg-white dark:bg-transparent max-sm:min-w-full md:mt-6 md:flex xl:min-w-[29%] xl:max-w-[29%] md:flex-col md:items-center md:rounded-3xl md:pb-5 md:shadow-md">
          <div className="min-w-full rounded-3xl md:dark:border-t md:dark:border-white/40 md:dark:bg-[#1c1c1c] md:dark:pb-4 md:dark:shadow-md md:dark:shadow-black">
            <Suspense fallback={<WeatherHighlightsSkeleton />}>
              <WeatherHighlights />
            </Suspense>
          </div>
          <SunriseSunset />
        </div>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast />
        </Suspense>
        {!isDeskTop && (
          <>
            <HourlyDetails />
            <MadeWithLove />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
