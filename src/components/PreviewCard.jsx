import React, { memo } from "react";
import { useApiData } from "../Context/ApiContext";
import PreviewCardSkeleton from "./Skeletons/PreviewCardSkeleton";
import WeatherStats from "./WeatherStats";

const PreviewCard = ({ index }) => {
  const { isLoading, currentData, getDailyData } = useApiData();
  if (isLoading) return <PreviewCardSkeleton />;

  const data = index !== undefined ? getDailyData(index) : currentData;

  const {
    temperature,
    feelsLike,
    description,
    dayName,
    imageName,
    minTemp,
    maxTemp,
  } = data;

  return (
    <div className="hover-scale-2 relative m-auto mb-4 mt-3 flex h-[272px] w-[96%] flex-col items-center rounded-[1.5rem] bg-gradient-to-br from-blue-400 to-blue-700 text-white shadow-lg shadow-black/50 dark:from-[#1d1d1d] dark:to-[#474747] dark:shadow-black md:h-[320px] md:w-[550px]">
      <h2 className="absolute right-12 top-2 flex items-center gap-1 text-[1rem] font-[600] text-white md:right-16 md:text-lg">
        {index === undefined && currentData.time}
      </h2>

      <img
        className={`hover-scale absolute h-[12em] w-[12em] rounded-xl md:-top-14 md:left-[2%] md:size-[14rem] ${imageName === "Clear" ? "-left-[3%] -top-[22%]" : "left-[1%] top-[-28%]"}`}
        src={`/${imageName}.png`}
        alt=""
      />
      <div className="absolute right-[7%] top-[12%] flex flex-col items-center justify-center font-oswald text-[3.31em] md:top-12 md:gap-3 md:text-7xl">
        <h1 className="font-extrabold">{temperature}°C</h1>

        <h2 className="ml-3 flex w-full items-center gap-1 font-oxanium text-base font-[500] md:text-xl">
          Feels like
          <span className="text-base md:text-xl">{feelsLike}°c</span>
        </h2>
        <h2 className="font-oxanium text-xl font-[700] text-white/70 md:text-2xl">
          {minTemp}° / {maxTemp}°
        </h2>
      </div>
      {/* Description & Day */}
      <div className="absolute left-[8%] top-[42%] flex h-3 w-[55%] flex-col gap-2 text-[1.3em] font-[600] capitalize leading-5 md:top-[45%] md:gap-5 md:text-[1.7rem]">
        <h2 className="flex flex-wrap italic">{description}</h2>
        <h2 className="text-base md:text-lg">{dayName}</h2>
      </div>

      <div className="weatherstats absolute bottom-5 flex w-full items-center justify-center gap-4 px-5">
        <WeatherStats index={index} />
      </div>
    </div>
  );
};

export default memo(PreviewCard);
