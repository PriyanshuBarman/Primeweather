import React, { memo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApiData } from "../Context/ApiContext";
import ForecastSunTimes from "./ForecastSunTimes";
import Highlights from "./Highlights";
import PageHeader from "./PageHeader";
import PreviewCard from "./PreviewCard";
import MadeWithLove from "./Skeletons/MadeWithLove";
import ForecastSkeleton from "./Skeletons/ForecastSkeleton";

const Forecast = () => {
  const { getDailyData, dailyData, isLoading } = useApiData();

  const { index } = useParams();
  const [activeIndex, setActiveIndex] = useState(Number(index));

  const handleCardClick = (idx) => {
    setActiveIndex(idx);
  };

  const isDeskTop = useMediaQuery({ minWidth: 768 });
  if (isLoading) return <ForecastSkeleton />;
  return (
    <div className="w-full bg-[#fafafa] pb-10 dark:bg-[#1d1d1d] md:flex md:h-full md:justify-between md:gap-5 md:pb-0 md:pl-28">
      <div className="container flex h-full w-full flex-col items-center justify-center gap-y-5 overflow-hidden pt-10 font-oxanium dark:text-white md:w-[75%]">
        {isDeskTop ? (
          <h1 className="absolute top-16 w-full text-center text-xl font-[500] italic leading-3">
            Forecast of next 5 days
          </h1>
        ) : (
          <PageHeader name={"Forecast"} />
        )}

        <div className="h-50 w-full md:mt-5">
          <Swiper
            className="w-full"
            style={{ padding: "12px 10px" }}
            spaceBetween={30}
            slidesPerView={5}
            modules={[FreeMode]}
            freeMode={true}
          >
            {dailyData.map((_, idx) => {
              const { dayName, temperature, imageName } = getDailyData(idx);

              return (
                <>
                  <SwiperSlide key={dayName}>
                    <div
                      onClick={() => handleCardClick(idx)}
                      className={`relative flex h-[6.5rem] w-[3.9rem] cursor-pointer justify-center overflow-hidden rounded-[1.7em] shadow-[1.5px_1px_2px_0px] shadow-black/40 dark:shadow-black md:h-[5.4rem] md:w-44 ${
                        idx === activeIndex
                          ? "scale-110 bg-gradient-to-l from-blue-400 to-blue-300 text-white dark:from-white/30"
                          : "hover-scale bg-white dark:bg-[#222222]"
                      }`}
                    >
                      <span className="absolute top-4 flex w-full flex-col text-center text-[.6rem] font-semibold md:top-1 md:text-lg md:font-[500] md:italic">
                        {dayName}
                      </span>
                      <div className="flex size-full flex-col items-center justify-center pb-1 pt-5 md:flex-row md:gap-6">
                        <img
                          className="h-[50%] w-[69%] md:size-16"
                          src={`/${imageName}.png`}
                          alt=""
                        />
                        <h1 className="pt-1 text-[.85em] font-[600] leading-3 dark:text-white md:text-2xl">
                          {temperature}°c
                        </h1>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full space-y-10 md:flex md:flex-row md:items-center md:justify-around md:pb-5">
          <div className="w-full md:h-full md:w-auto md:space-y-7">
            <PreviewCard index={activeIndex} />
            {isDeskTop && <ForecastSunTimes index={activeIndex} />}
          </div>
          <div className="hover-scale-2 rounded-3xl md:h-[97%] md:w-[40%] md:bg-white md:pt-2 md:shadow-md md:dark:bg-[#1c1c1c] md:dark:shadow-md md:dark:shadow-black">
            <Highlights index={activeIndex} />
          </div>
        </div>
        {!isDeskTop && <ForecastSunTimes index={activeIndex} />}
      </div>

      {isDeskTop ? (
        <div className="relative flex h-full w-[23%] bg-gradient-to-b from-transparent to-blue-500 dark:to-white/70">
          <div className="relative z-0 m-auto flex h-[50%] w-full flex-col items-center gap-10">
            {dailyData.map((_, idx) => (
              <h2
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer text-center text-3xl font-[600] italic transition-all duration-300 ease-in-out ${
                  idx === activeIndex
                    ? "scale-[1.40] text-blue-600 dark:text-black"
                    : "text-white hover:scale-[1.15] dark:text-black/60 hover:dark:text-black/75"
                }`}
              >
                {getDailyData(idx).dayName}
              </h2>
            ))}
          </div>
        </div>
      ) : (
        <MadeWithLove />
      )}
    </div>
  );
};

export default memo(Forecast);
