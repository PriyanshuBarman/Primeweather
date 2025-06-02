import React, { memo, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import "swiper/css";
import { useApiData } from "../context/ApiContext";
const HourlyDetails = () => {
  const { hourlyData, currentData } = useApiData();
  const [selectedTab, setSelectedTab] = useState("humidity");

  const filterTabs = ["humidity", "wind"];
  currentData.precipitationProbability > 30
    ? filterTabs.push("precipitation")
    : filterTabs.push("temperature");

  return (
    <>
      <h2 className="mt-8 w-full pl-4 text-sm font-[500] leading-3">
        Hourly Details
      </h2>
      <section className="w-[97%] select-none space-y-8 rounded-xl border pb-2 pt-4 shadow-sm dark:border-white/15 dark:bg-[#1d1d1d] dark:text-white dark:shadow-md dark:shadow-black">
        <div className="Filter-Tabs space-x-2 pl-4 text-xs">
          {filterTabs.map((tabName) => (
            <button
              key={tabName}
              className={`rounded-full border px-3 py-1.5 capitalize transition-all duration-500 dark:border-white/20 ${selectedTab === tabName && "border-black/60 font-[500] dark:border-white/60"}`}
              onClick={() => setSelectedTab(tabName)}
            >
              {tabName}
            </button>
          ))}
        </div>

        <div className="flex gap-6 overflow-auto px-4">
          {hourlyData?.map((_, index) => (
            <div key={index}>
              {selectedTab === "wind" && <WindDirection {...{ index }} />}
              {selectedTab === "humidity" && <Humidity {...{ index }} />}
              {selectedTab === "temperature" && <Temperature {...{ index }} />}
              {selectedTab === "precipitation" && (
                <Precipitation {...{ index }} />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HourlyDetails;

const WindDirection = memo(({ index }) => {
  const { getHourlyData } = useApiData();
  const { time, dayName, windDirection, windSpeed } = getHourlyData(index);

  return (
    <div className="relative flex h-44 flex-col items-center justify-end gap-4 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-end gap-4">
        <p className="flex flex-col items-center gap-2 text-nowrap text-xs">
          {windSpeed} km/h
          <span className="font-semibold">N</span>
        </p>
        <CiLocationArrow1
          className="mb-8 size-10 text-black/70 dark:text-white/80"
          style={{
            transform: `rotate(${windDirection}deg)`,
          }}
        />
      </div>
      <TimeDate {...{ time, dayName }} />
    </div>
  );
});

const Humidity = memo(({ index }) => {
  const { getHourlyData } = useApiData();
  const { time, dayName, humidity } = getHourlyData(index);

  return (
    <div className="relative flex h-44 flex-col items-center justify-end gap-4 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-end gap-1">
        <span className="text-xs">{humidity}%</span>
        <div
          className="Level w-9 rounded-2xl shadow-[0_0_2px_1px] shadow-black/10 dark:shadow-black"
          style={{
            backgroundColor: `rgba(31, 106, 252, ${humidity / 100})`,
            height: `${humidity}%`,
          }}
        ></div>
      </div>
      <TimeDate {...{ time, dayName }} />
    </div>
  );
});

const Precipitation = memo(({ index }) => {
  const { getHourlyData } = useApiData();
  const { time, dayName, humidity, precipitationProbability } =
    getHourlyData(index);

  return (
    <div className="relative flex h-44 flex-col items-center justify-end gap-4 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-end gap-1">
        <span className="text-xs">{precipitationProbability}%</span>
        <div
          className="Level w-9 rounded-2xl"
          style={{
            backgroundColor: `rgba(31, 106, 252, ${precipitationProbability / 100})`,
            height: `${precipitationProbability}%`,
          }}
        ></div>
      </div>
      <TimeDate {...{ time, dayName }} />
    </div>
  );
});

const Temperature = memo(({ index }) => {
  const { getHourlyData } = useApiData();
  const { time, dayName, temperature } = getHourlyData(index);

  return (
    <div className="relative flex h-44 flex-col items-center justify-end gap-4 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-end gap-1">
        <span className="text-nowrap text-xs">{temperature} ℃</span>
        <div
          className="Level w-9 rounded-2xl bg-orange-400 shadow-[0_0_2px_1px] shadow-black/10 dark:bg-orange-400/70 dark:shadow-black"
          style={{
            height: `${temperature + 30}%`,
          }}
        ></div>
      </div>
      <TimeDate {...{ time, dayName }} />
    </div>
  );
});

const TimeDate = ({ time, dayName }) => {
  return (
    <p className="Card-Footer relative flex flex-col items-center justify-center pb-4 text-center text-xs font-[500] transition-all duration-200">
      <span className="time text-nowrap">{time}</span>
      <span className="absolute bottom-0 rounded-xl italic leading-3">
        {dayName}
      </span>
    </p>
  );
};
