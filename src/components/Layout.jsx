import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import { useApiData } from "../Context/ApiContext";
import BottomNavbar from "./BottomNavbar";
import DeskTopSidebar from "./DeskTopSidebar.jsx";
import ErrPage from "./ErrPage";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import SearchPage from "./SearchPage";

const Layout = () => {
  const { errCode } = useApiData();
  const isDeskTop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="h-full w-full">
      {isDeskTop && <DeskTopSidebar />}
      {isDeskTop && <Navbar />}

      {!errCode ? <Outlet /> : <ErrPage />}

      <SearchPage />
      {isDeskTop ? <Footer /> : <BottomNavbar />}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
