import { useEffect, useRef, useState } from "react";
import { useApiData } from "../context/ApiContext";
import WidgetSkeleton from "./skeletons/WidgetSkeleton";
import Tooltip from "./Tooltip";

const Widget = ({ name, data, unit, icon, isHidden, label }) => {
  const { isLoading } = useApiData();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const widgetRef = useRef(null);

  const handleClick = () => {
    setShowTooltip((prev) => !prev);
    setIsClicked(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setShowTooltip(false);
        setIsClicked(false);
      }
    };

    if (isClicked) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  if (isHidden) return;
  if (isLoading) return <WidgetSkeleton />;

  return (
    <div
      ref={widgetRef}
      onClick={handleClick}
      className="widget hover-scale group relative flex h-[120px] w-[148px] cursor-pointer select-none flex-wrap justify-center rounded-2xl rounded-tl-md bg-white/25 pb-1 pr-4 pt-2 text-black/80 shadow-[3px_3px_3px_.2px] shadow-black/30 dark:bg-black/15 dark:text-white/80 dark:shadow-black md:h-[109px] md:w-[150px] md:shadow-[2px_3px_3px_.2px] md:shadow-black/15"
    >
      <div className="w-full">
        <h2 className="flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent via-black/5 to-black/5 pl-3 text-start text-sm font-[500] leading-3 shadow-[0px_1px_1px_0px] shadow-black/20 dark:rounded-l-sm dark:via-white/10 dark:to-white/5 dark:text-white/80 dark:shadow-black md:via-white md:text-sm md:font-[600] md:leading-3 md:dark:to-transparent md:dark:font-[500]">
          {label}
        </h2>
      </div>
      <div className="flex w-full items-center justify-between gap-3 pl-4">
        <div className="flex">
          <h5 className="text-[1.6rem] font-[550] leading-7 md:font-[500]">
            {data}
          </h5>
          <h5 className="ml-1 mt-auto pb-1 font-semibold dark:text-white/70 md:text-lg">
            {unit}
          </h5>
        </div>
        <div className="mb-2 text-black/50 dark:text-white/60">{icon}</div>
      </div>

      <Tooltip name={name} showTooltip={showTooltip} />
    </div>
  );
};
export default Widget;
