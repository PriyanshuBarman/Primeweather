import { memo } from "react";
import { useNavigate } from "react-router-dom";

const ErrPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-2 bg-white font-oxanium dark:bg-[#181818]`}
    >
      <h1 className="md:text-3xl">Page Not Found</h1>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600 md:text-base"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default memo(ErrPage);
