import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ForecastSkeleton from "./components/skeletons/ForecastSkeleton";
import HourlyPageSkeleton from "./components/skeletons/HourlyPageSkeleton";
import Layout from "./layouts/Layout";
import ErrPage from "./pages/ErrPage";
import Home from "./pages/Home";
import HourlyPage from "./pages/HourlyPage";
import SearchPage from "./pages/SearchPage";
const Forecast = lazy(() => import("./pages/Forecast"));

export let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/forecast/:index",
        element: (
          <Suspense fallback={<ForecastSkeleton />}>
            <Forecast />
          </Suspense>
        ),
      },
      {
        path: "forecast/hourly",
        element: (
          <Suspense fallback={<HourlyPageSkeleton />}>
            <HourlyPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <ErrPage />,
      },
    ],
  },
]);
