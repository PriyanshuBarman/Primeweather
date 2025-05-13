import { MdRefresh } from "react-icons/md";
import { useApiData } from "../context/ApiContext";
import { errorMessages } from "../utils/helper";

const ErrorModal = () => {
  const { errCode } = useApiData();
  if (errCode < 429 || !errCode) return;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-lvh w-full items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative bottom-20 w-[90%] space-y-16 rounded-lg border-r border-t bg-white p-6 shadow-lg dark:bg-[#2e2e2e] dark:text-white dark:shadow-black md:w-[40%] md:space-y-40 md:rounded-xl">
        <h2 className="mb-4 md:text-xl md:font-[500]">
          {errorMessages[errCode]}
        </h2>
        <div className="flex justify-end">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-1.5 text-xs text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 md:py-2 md:text-base"
          >
            <MdRefresh className="size-5" />
            Refresh page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
