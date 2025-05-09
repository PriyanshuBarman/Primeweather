import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApiData } from "../context/ApiContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import ErrPage from "../pages/ErrPage.jsx";
import BottomNavbar from "./BottomNavbar.jsx";
import DeskTopSidebar from "./DeskTopSidebar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
const Layout = () => {
  const { errCode } = useApiData();
  const { currentTheme } = useTheme();
  const isDeskTop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="h-full w-full">
      {isDeskTop && <DeskTopSidebar />}
      {isDeskTop && <Navbar />}

      {!errCode ? <Outlet /> : <ErrPage />}
      <ToastContainer
        hideProgressBar
        draggable
        draggablePercent={50}
        theme={currentTheme}
      />

      {isDeskTop ? <Footer /> : <BottomNavbar />}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
