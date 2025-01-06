import React, { memo, useState } from "react";
import { BsCloudHaze2 } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaEye, FaWind } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { SiRainmeter } from "react-icons/si";
import { WiRaindrops, WiRainMix } from "react-icons/wi";
import { useMediaQuery } from "react-responsive";
import { useApiData } from "../Context/ApiContext";
import PageHeader from "./PageHeader";
import HourlyCardSkeleton from "./Skeletons/HourlyCardSkeleton";

const HourlyPage = () => {
  const { hourlyData, city } = useApiData();

  const isDeskTop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="relative w-full gap-y-5 bg-white text-base text-black dark:bg-[#1c1c1c] dark:text-white/90 md:right-0 md:h-full md:overflow-y-auto md:rounded-2xl md:px-5">
      <PageHeader name={"Hourly Forecast"} />

      <div className="hourly-cards m-auto w-full items-center justify-center space-y-6 pt-3 md:w-[40%]">
        <h2 className="sticky top-0 z-10 mt-7 flex h-10 w-full justify-center px-9 pb-2 pt-2 text-center font-semibold italic backdrop-blur-xl md:top-12 md:text-xl">
          {isDeskTop ? (
            "Hourly Forecast"
          ) : (
            <>
              <MdLocationOn className="size-5 md:size-6" /> {city}
            </>
          )}
        </h2>
        {hourlyData?.map((_, index) => (
          <HourlyCard key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default memo(HourlyPage);

const HourlyCard = memo(({ index }) => {
  const { getHourlyData, isLoading } = useApiData();
  if (isLoading) return <HourlyCardSkeleton />;
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    time,
    dayName,
    temperature,
    description,
    feelsLike,
    windSpeed,
    windDirection,
    humidity,
    clouds,
    imageName,
    visibility,
    precipitationProbability,
  } = getHourlyData(index);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const stats = [
    {
      label: "Humidity",
      value: humidity,
      unit: "%",
      icon: <SiRainmeter className="size-6 fill-black/60 dark:fill-white/50" />,
    },
    {
      label: "Visibility",
      value: visibility,
      unit: "km",
      icon: <FaEye className="size-5 fill-black/60 dark:fill-white/50" />,
    },
    {
      label: "Chances of Rain",
      value: precipitationProbability,
      unit: "%",
      icon: <WiRainMix className="size-8 fill-black/60 dark:fill-white/50" />,
    },
    {
      label: "Clouds",
      value: clouds,
      unit: "%",
      icon: (
        <BsCloudHaze2 className="size-6 fill-black/60 dark:fill-white/50" />
      ),
    },

    {
      label: "Wind Speed",
      value: windSpeed,
      unit: "km/h",
      icon: <FaWind className="fill-black/60 dark:fill-white/50" />,
    },

    {
      label: "WindDirection",
      icon: (
        <CiLocationArrow1
          className="size-8 text-black/70 dark:text-white/80"
          style={{
            transform: `rotate(${windDirection}deg)`,
          }}
        />
      ),
    },
  ];

  return (
    <div
      onClick={toggleExpand}
      className={`relative m-auto flex w-[94%] cursor-pointer flex-col rounded-xl rounded-br-none border-l border-t border-black/15 bg-white shadow-md shadow-black/10 dark:border-white/5 dark:bg-[#1d1d1d] dark:text-white/90 dark:shadow-black md:pb-3`}
    >
      <div className="relative flex h-[5rem] cursor-pointer items-center justify-around overflow-hidden rounded-xl">
        <h5 className="absolute left-0 top-0 flex justify-evenly whitespace-pre rounded-br-2xl bg-black/5 pl-4 pr-4 text-center text-[.67rem] font-[500] italic leading-4 shadow-sm shadow-black/30 dark:bg-white/5 dark:text-white/80 dark:shadow-black md:pr-8 md:text-sm">
          {dayName} {time}
        </h5>

        <div className="mt-1 flex h-full items-center md:mt-5">
          <img
            className="size-[3.5rem] rounded-xl md:size-20"
            src={`/${imageName}.png`}
            alt={description}
          />
        </div>
        <h2 className="flex h-full w-[30%] items-center justify-center text-[.95rem] font-[500] capitalize leading-3 md:text-xl md:italic">
          {description}
        </h2>
        <div className="relative flex h-full flex-col items-center justify-center">
          <h2 className="text-xl font-semibold md:text-2xl">{temperature}°c</h2>
          {precipitationProbability > 20 ? (
            <h5 className="precipitation relative left-1 top-1 text-sm font-[500] md:text-lg">
              {precipitationProbability}%
              <WiRaindrops className="absolute -left-10 -top-4 size-14 fill-blue-600 md:-left-12 md:size-16 md:fill-blue-500" />
            </h5>
          ) : (
            <h2 className="mt-1 items-center text-xs font-[500] md:text-base">
              Feels like {feelsLike}°c
            </h2>
          )}
        </div>
      </div>

      <div
        className={`${
          isExpanded ? "h-36 opacity-100 md:h-40" : "h-0"
        } m-auto flex w-full flex-wrap justify-around overflow-hidden transition-all duration-200 md:w-[92%] md:justify-evenly`}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex h-[3rem] w-24 flex-col items-center justify-center gap-1 rounded-xl bg-black/5 shadow transition-all delay-200 duration-200 ease-in-out dark:bg-white/5 md:h-16 md:w-32 ${isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          >
            <span className="flex w-full items-center justify-center gap-1 font-[500]">
              {stat.icon}
              <span className="text-lg">{stat.value}</span>
              <span className="text-sm">{stat.unit}</span>
            </span>
            <h1 className="text-center text-[.55rem] font-[500] leading-normal text-black/60 dark:text-white/75 md:text-sm">
              {stat.label}
            </h1>
          </div>
        ))}
      </div>

      <button
        className="w-26 absolute -bottom-3 right-0 flex gap-2 rounded-bl-3xl rounded-br-2xl bg-inherit px-4 pb-0.5 text-xs font-[500] italic leading-3 shadow-md shadow-black/10 dark:shadow-black"
        onClick={toggleExpand}
      >
        {isExpanded ? (
          <div className="flex w-full items-center gap-1">
            Less
            <IoIosArrowUp />
          </div>
        ) : (
          <div className="flex w-full items-center gap-1">
            More
            <IoIosArrowDown />
          </div>
        )}
      </button>
    </div>
  );
});
