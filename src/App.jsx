import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ForecastSkeleton from "./components/Skeletons/ForecastSkeleton";
import HourlyPageSkeleton from "./components/Skeletons/HourlyPageSkeleton";
import { ApiProvider } from "./Context/ApiContext";
import { SearchProvider } from "./Context/SearchContext";
import { SidebarProvider } from "./Context/SidebarContext";
import { ThemeProvider } from "./Context/ThemeContext";
import HourlyPage from "./components/HourlyPage";
import Home from "./components/Home";
import ErrPage from "./components/ErrPage";
const Forecast = lazy(() => import("./components/Forecast"));

function App() {
  let Routes = createBrowserRouter([
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
          path: "*",
          element: <ErrPage />,
        },
      ],
    },
  ]);

  return (
    <ApiProvider>
      <ThemeProvider>
        <SidebarProvider>
          <SearchProvider>
            <RouterProvider router={Routes} />
          </SearchProvider>
        </SidebarProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;
