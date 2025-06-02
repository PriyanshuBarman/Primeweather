import React from "react";
import { BiSolidHide } from "react-icons/bi";
import { useSidebar } from "../context/SidebarContext";

const Tooltip = ({ name, showTooltip }) => {
  const { toggleWidget } = useSidebar();
  return (
    <div
      onClick={() => toggleWidget(name)}
      className={`tooltip absolute right-3 top-0 mb-4 transition-all duration-200 ease-in-out ${
        showTooltip
          ? "-translate-y-10 scale-100 opacity-100"
          : "scale-0 opacity-0"
      }`}
    >
      <div className="relative">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-sm font-[500] text-white shadow backdrop-blur-sm hover:scale-105 dark:bg-white/90 dark:text-black md:dark:font-semibold">
          <BiSolidHide size={20} />
          Hide
        </div>
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-[4px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-black/80 dark:border-t-white/90"></div>
      </div>
    </div>
  );
};

export default Tooltip;
