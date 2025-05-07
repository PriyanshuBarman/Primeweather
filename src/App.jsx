import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ApiProvider } from "./context/ApiContext";
import { SearchProvider } from "./context/SearchContext";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import { routes } from "./router";
function App() {
  return (
    <ApiProvider>
      <ThemeProvider>
        <SidebarProvider>
          <SearchProvider>
            <RouterProvider router={routes} />
          </SearchProvider>
        </SidebarProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;
