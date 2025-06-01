import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ReactGA from "react-ga4";

const GA_MEAS_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

ReactGA.initialize(GA_MEAS_ID);

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
);
