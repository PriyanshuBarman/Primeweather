import React, { memo } from "react";
import { BsCloudHaze2 } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoTimer } from "react-icons/io5";
import { SiRainmeter } from "react-icons/si";
import { WiRainMix } from "react-icons/wi";
import { useApiData } from "../context/ApiContext";
import { useSidebar } from "../context/SidebarContext";
import Widget from "./Widget";

const WeatherHighlights = ({ index }) => {
  const { hiddenWidgets, isAllWidgetsHidden } = useSidebar();
  const { currentData, isLoading, getDailyData } = useApiData();
  if (isAllWidgetsHidden) return;

  const data = index !== undefined ? getDailyData(index) : currentData;

  const {
    uvIndex,
    uvHealthConcern,
    windDirection,
    humidity,
    pressure,
    rainIntensity,
    clouds,
  } = data;

  const widgets = [
    {
      isHidden: hiddenWidgets.uvIndex,
      label: "UV Index",
      name: "uvIndex",
      data: uvIndex,
      unit: uvHealthConcern,
      icon: (
        <meter
          min="-1"
          max="11"
          value={uvIndex}
          className="h-12"
          low="3"
          high="6"
          optimum="1"
        ></meter>
      ),
    },
    {
      isHidden: hiddenWidgets.humidity,
      label: "Humidity",
      name: "humidity",
      data: humidity,
      unit: "%",
      icon: <SiRainmeter className="h-12 w-10" />,
    },
    {
      isHidden: hiddenWidgets.clouds,
      label: "Clouds",
      name: "clouds",
      data: clouds,
      unit: "%",
      icon: <BsCloudHaze2 className="h-14 w-10" />,
    },
    {
      isHidden: hiddenWidgets.pressure,
      label: "Pressure",
      name: "pressure",
      data: pressure,
      unit: "hPa",
      icon: <IoTimer className="h-16" />,
    },
    {
      isHidden: hiddenWidgets.precipitation,
      label: "Precipitation",
      name: "precipitation",
      data: rainIntensity,
      unit: "mm",
      icon: <WiRainMix className="h-14 w-14" />,
    },
    {
      isHidden: hiddenWidgets.windDirection,
      label: "Wind Direction",
      name: "windDirection",
      icon: (
        <CiLocationArrow1
          className="myArrow mb-2 mr-9 h-full w-[3.5rem] text-black/60 dark:text-white/70"
          style={{
            transform: `rotate(${windDirection}deg)`,
          }}
        />
      ),
    },
  ];

  return (
    <section className="WeatherHighlights-container relative mb-2 flex w-full flex-col items-center justify-center">
      {isLoading ? (
        <div className="heading-skeleton inline-flex h-8 w-[94%] animate-pulse items-center justify-center rounded-full bg-black/5 shadow-md dark:bg-white/10 dark:shadow-black/80 md:mt-3 md:h-7 md:bg-transparent md:shadow-none md:dark:bg-transparent">
          <div className="flex h-full flex-col items-start justify-center gap-1">
            <div className="h-1 w-20 rounded bg-black/20 dark:bg-white/15 md:w-28"></div>
            <div className="h-1 w-6 rounded bg-black/20 dark:bg-white/15 md:w-10"></div>
          </div>
        </div>
      ) : (
        <h1 className="hover-scale flex h-8 w-[95%] items-center justify-center rounded-full bg-black/5 text-[.9rem] font-[500] italic shadow-md dark:bg-white/10 dark:shadow-black md:mt-3 md:h-7 md:min-w-full md:bg-transparent md:text-lg md:font-[500] md:shadow-none md:dark:bg-transparent">
          Weather WeatherHighlights
        </h1>
      )}

      {/* Cards Container */}
      <div className="cards-container mt-5 flex flex-wrap justify-evenly gap-4">
        {widgets.map((widget, idx) => (
          <Widget
            key={idx}
            isHidden={widget.isHidden}
            label={widget.label}
            name={widget.name}
            data={widget.data}
            unit={widget.unit}
            icon={widget.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(WeatherHighlights);
