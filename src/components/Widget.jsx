import { useEffect, useRef, useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { useApiData } from "../Context/ApiContext";
import { useSidebar } from "../Context/SidebarContext";
import WidgetSkeleton from "./Skeletons/WidgetSkeleton";

const Widget = ({ name, data, unit, icon, isHidden, label }) => {
  const { isLoading } = useApiData();
  const { toggleWidget } = useSidebar();

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

    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

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
      className="widget hover-scale group relative flex h-[120px] w-[148px] cursor-pointer select-none flex-wrap justify-center rounded-2xl rounded-tl-md bg-white/25 pb-1 pr-4 pt-2 text-black/80 shadow-[3px_5px_5px_.2px] shadow-black/30 dark:bg-black/15 dark:text-white dark:shadow-black md:h-[109px] md:w-[150px] md:shadow-[2px_3px_3px_.2px] md:shadow-black/15"
    >
      <div className="w-full">
        <h2 className="flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent via-black/5 to-black/5 pl-3 text-start text-sm font-[500] leading-3 shadow-[0px_1px_1px_0px] shadow-black/20 dark:rounded-l-sm dark:via-white/10 dark:to-white/5 dark:text-white dark:shadow-black md:via-white md:text-base md:font-[600] md:leading-3 md:dark:to-transparent md:dark:font-[500]">
          {label}
        </h2>
      </div>
      <div className="flex w-full items-center justify-between gap-3 pl-4">
        <div className="flex">
          <h5 className="text-[1.8rem] font-[600] leading-7">{data}</h5>
          <h5 className="ml-1 text-lg font-bold dark:text-white/70">{unit}</h5>
        </div>
        <div className="text-black/70 dark:text-white/80">{icon}</div>
      </div>

      <div
        onClick={() => toggleWidget(name)}
        className={`tooltip absolute right-3 top-0 mb-4 transition-all duration-200 ease-in-out ${
          showTooltip
            ? "-translate-y-10 scale-100 opacity-100"
            : "scale-0 opacity-0"
        }`}
      >
        <div className="relative">
          <div className="flex items-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-r from-blue-300 to-blue-500 px-3 py-1.5 text-sm font-[500] text-white shadow backdrop-blur-sm hover:scale-105 dark:from-white dark:to-white dark:text-black md:dark:font-semibold">
            <BiSolidHide size={20} />
            Hide
          </div>
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-[4px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-400 dark:border-t-white"></div>
        </div>
      </div>
    </div>
  );
};
export default Widget;
