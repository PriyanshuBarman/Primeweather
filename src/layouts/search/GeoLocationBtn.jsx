import { MdMyLocation } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiData } from "../../context/ApiContext";
import ReactGA from "react-ga4";

const GeoLocationBtn = ({ closeAll }) => {
  const { search } = useApiData();
  const isDeskTop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!navigator.geolocation)
      return toast.error("Geolocation is not supported by your browser.");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        isDeskTop ? closeAll() : navigate("/", { replace: true });
        const { latitude, longitude } = coords;
        search(latitude, longitude);

        ReactGA.event({
          category: "Location",
          action: `Geolocation Btn Clicked`,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          toast.error("Permission denied. Please allow location access.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          toast.error(
            "Position unavailable. Ensure you are using a Device that has GPS support",
          );
        } else if (err.code === err.TIMEOUT) {
          toast.error("Location request timed out. Please try again.");
        } else {
          toast.error("Unable to retrieve your location.");
        }
      },
    );
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Use current location"
      className="flex items-center justify-center rounded-full bg-black/80 p-2 text-white shadow-md dark:bg-white/15 dark:text-white dark:shadow-black/50"
    >
      <MdMyLocation size={20} className="min-h-4 min-w-4" />
    </button>
  );
};

export default GeoLocationBtn;
