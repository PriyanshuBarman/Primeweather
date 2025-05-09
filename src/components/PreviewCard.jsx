import React, { memo } from "react";
import { useApiData } from "../context/ApiContext";
import { useTime } from "../hooks/useTime";
import PreviewCardSkeleton from "./skeletons/PreviewCardSkeleton";
import WeatherStats from "./WeatherStats";

const PreviewCard = ({ index }) => {
  const { isLoading, currentData, getDailyData, timeZone, city } = useApiData();
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
    <div className="hover-scale-2 relative m-auto mb-4 mt-3 flex h-[272px] w-[96%] flex-col items-center rounded-[1.5rem] bg-gradient-to-br from-blue-400 to-blue-700 text-white shadow-lg shadow-black/50 dark:from-[#1d1d1d] dark:to-[#474747] dark:shadow-black md:h-[320px] md:w-[100%]">
      {<Time {...{ index, timeZone, city }} />}

      <img
        className={`hover-scale absolute rounded-xl md:-top-14 md:left-[2%] ${imageName === "Clear" ? "-left-[3%] -top-[22%] size-[11.7rem] md:size-[13rem]" : "left-[-2%] top-[-24%] size-[12rem] md:size-[14rem]"}`}
        src={`/${imageName}.png`}
        alt=""
      />
      <div
        className={`${index === undefined ? "right-[6%] top-[12%] text-[3.5em] md:text-7xl" : "right-[4%] top-[12%] text-[3.8em] md:top-[2%] md:text-[4.7rem]"} absolute flex flex-col items-center justify-center font-oswald md:top-12 md:gap-3`}
      >
        <h1 className="bg-gradient-to-b from-white via-white to-white/30 bg-clip-text font-extrabold text-transparent dark:to-transparent">
          {temperature}°C
        </h1>

        <h2 className="ml-3 flex w-full items-center gap-1 font-oxanium text-sm font-[500] md:text-xl">
          Feels like
          <span className="text-base md:text-xl">{feelsLike}°c</span>
        </h2>
        <h2 className="font-oxanium mt-2 text-lg font-[700] text-white/70 md:text-2xl">
          {minTemp}° / {maxTemp}°
        </h2>
      </div>
      {/* Description & Day */}
      <div className="absolute left-[8%] top-[45%] flex h-3 w-[55%] flex-col gap-3 text-[1.3em] font-[600] capitalize leading-5 md:top-[45%] md:gap-3 md:text-[1.7rem]">
        <h2 className="flex flex-wrap italic">{description}</h2>
        <h2 className="text-sm md:text-lg">{dayName}</h2>
      </div>

      <div className="weatherstats absolute bottom-5 flex w-full items-center justify-center gap-4 px-5">
        <WeatherStats index={index} />
      </div>
    </div>
  );
};

export default memo(PreviewCard);

const Time = memo(({ index, timeZone, city }) => {
  const time = useTime(timeZone);

  return (
    <h2 className="absolute right-12 top-2 flex items-center gap-1 text-[1rem] font-[600] text-white md:right-20 md:text-lg">
      {index >= 0 ? city : time}
    </h2>
  );
});
