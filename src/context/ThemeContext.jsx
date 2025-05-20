import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactGA from "react-ga4";

// Step 1: Create a context to hold theme data
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Step 2: Use useLocalStorage to manage the theme
  const [currentTheme, setCurrentTheme] = useLocalStorage("theme", "light"); // Default is light

  // Step 3: Apply the selected theme to the document (now a useEffect)
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]); // Run effect when currentTheme changes

  // Step 4: Toggle theme function (simplified)
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");

    ReactGA.event({
      category: "Theme",
      action: `Change theme to: ${currentTheme}`,
    });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
