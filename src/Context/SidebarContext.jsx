import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isDailyForecastHidden, setisDailyForecastHidden] = useLocalStorage(
    "isDailyForecastHidden",
    false,
  );

  const [hiddenWidgets, setHiddenWidgets] = useLocalStorage("hiddenWidgets", {
    uvIndex: false,
    humidity: false,
    clouds: false,
    precipitation: false,
    pressure: false,
    windDirection: false,
    sunriseSunset: false,
  });

  const toggleWidget = (widgetName) => {
    setHiddenWidgets((prevState) => ({
      ...prevState,
      [widgetName]: !prevState[widgetName],
    }));
  };

  return (
    <SidebarContext.Provider
      value={{
        hiddenWidgets,
        toggleWidget,
        setisDailyForecastHidden,
        isDailyForecastHidden,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
