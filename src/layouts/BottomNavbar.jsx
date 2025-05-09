import { IoMdSearch } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import GeoLocationBtn from "./search/GeoLocationBtn";

const BottomNavbar = () => {
  const tabs = [
    {
      name: "Home",
      link: "/",
      icon: <TbHomeFilled size={22} />,
    },
    { name: "Forecast", link: "/forecast/0", icon: <TiChartLine size={24} /> },
    {
      name: "Search",
      link: "/search",
      icon: <IoMdSearch size={27} strokeWidth={1.5} />,
    },
  ];
  return (
    <nav className="fixed bottom-3 left-1/2 z-10 flex h-16 w-[88%] -translate-x-1/2 items-center justify-around rounded-2xl border-black/30 bg-white px-2 font-oxanium shadow-[_2px_3px_5px_0px] shadow-black/40 dark:border-white/20 dark:bg-[#1d1d1d] dark:text-white dark:shadow-black">
      {tabs.map((tab, index) => (
        <NavLink
          key={index}
          to={tab.link}
          className={({ isActive }) =>
            ` ${isActive ? "text-blue-500" : "text-black/65 dark:text-white/80"} flex h-full items-center gap-0.5`
          }
        >
          {tab.icon}
          <span className="text-[.7rem]">{tab.name}</span>
        </NavLink>
      ))}
      <GeoLocationBtn />
    </nav>
  );
};

export default BottomNavbar;
