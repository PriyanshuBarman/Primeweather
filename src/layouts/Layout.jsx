import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorModal from "../components/ErrorModal.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import BottomNavbar from "./BottomNavbar.jsx";
import DeskTopSidebar from "./DeskTopSidebar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
const Layout = () => {
  const { currentTheme } = useTheme();
  const isDeskTop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="h-full w-full">
      {isDeskTop && <DeskTopSidebar />}
      {isDeskTop && <Navbar />}
      <ErrorModal />
      <Outlet />
      <ToastContainer
        hideProgressBar
        draggable
        draggablePercent={30}
        theme={currentTheme}
      />

      {isDeskTop ? <Footer /> : <BottomNavbar />}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
