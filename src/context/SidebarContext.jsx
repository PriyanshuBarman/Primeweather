import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactGA from "react-ga4";

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
  const isAllWidgetsHidden = Object.values(hiddenWidgets).every((v) => v);

  const toggleWidget = (widgetName) => {
    setHiddenWidgets((prevState) => ({
      ...prevState,
      [widgetName]: !prevState[widgetName],
    }));

    ReactGA.event({
      category: "ToggleWidget",
      action: `Hide/Unhide widget`,
      label: widgetName,
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        hiddenWidgets,
        isAllWidgetsHidden,
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
