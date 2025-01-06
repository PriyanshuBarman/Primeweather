import React, { memo } from "react";
import { useApiData } from "../Context/ApiContext";
import WeatherCardSkeleton from "./Skeletons/WeatherCardSkeleton";

const WeatherCard = () => {
  const { currentData, isLoading } = useApiData();
  if (isLoading) return <WeatherCardSkeleton />;

  let {
    temperature,
    minTemp,
    maxTemp,
    feelsLike,
    description,
    imageName,
    time,
    dayName,
  } = currentData;

  return (
    <section className="weather-card relative flex h-[240px] w-[97%] flex-col items-center rounded-[1.7em] border-l bg-gradient-to-t from-blue-700 to-blue-400 text-white/95 shadow-lg shadow-black/50 dark:border-white/10 dark:bg-gradient-to-tr dark:from-[#151515] dark:to-[#464646] dark:shadow-black md:h-[300px] md:w-[50%]">
      <h2 className="time absolute right-14 top-2 flex items-center font-[600] text-white">
        {time}
      </h2>

      <svg
        className="animated-wave absolute bottom-0 rotate-[180deg] rounded-t-3xl fill-sky-100 dark:fill-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        fill="#000"
      >
        <path
          className="path1"
          d="M0 1v99c134.3 0 153.7-99 296-99H0Z"
          opacity=".5"
        ></path>
        <path
          className="path2"
          d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
          opacity=".5"
        ></path>
        <path
          className="path3"
          d="M617 1v86C372 119 384 1 196 1h421Z"
          opacity=".5"
        ></path>
        <path
          className="path4"
          d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"
        ></path>
      </svg>

      <img
        className="weather-image absolute left-[1%] top-[-28%] h-[12em] w-[12em] rounded-xl"
        src={`${imageName}.png`}
        alt={`Weather icon for ${description}`} // Descriptive alt text added
      />
      <div className="temperature-info absolute right-[6%] top-[18%] flex flex-col items-center justify-center font-oswald text-[3.31em]">
        <h3 className="temperature font-bold">{temperature}°C</h3>

        <h4 className="feels-like ml-3 flex w-full items-center gap-1 font-oxanium text-base font-[500]">
          Feels like
          <span className="feels-like-temperature text-base">
            {feelsLike}°c
          </span>
        </h4>
        <h3 className="min-max mt-2 font-oxanium text-xl font-[700] text-white/70">
          {minTemp}° / {maxTemp}°
        </h3>
      </div>

      {/* Description & Day */}
      <div className="description-day absolute bottom-[40%] left-[8%] flex h-3 w-[50%] flex-col text-[1.3em] font-[600] capitalize italic">
        <p className="description flex flex-wrap">{description}</p>
        <p className="dayName text-[1rem]">{dayName}</p>
      </div>
    </section>
  );
};

export default memo(WeatherCard);
