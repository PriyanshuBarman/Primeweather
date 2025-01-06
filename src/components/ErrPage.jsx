import React, { memo } from "react";
import { IoMdSearch } from "react-icons/io";
import { useApiData } from "../Context/ApiContext";
import { useSearch } from "../Context/SearchContext";

const ErrPage = () => {
  const { isLoading, errCode } = useApiData();
  const { openSearchPage } = useSearch();

  const getErrorMessage = (code) => {
    switch (code) {
      case "429":
        return {
          message:
            "Oops, we’ve hit our limit. Don’t worry, we’re recharging—check back soon!",
          imageName: "limit.webp",
        };

      case "400":
        return {
          message:
            "Uh-oh! Is that a new city? Double-check your spelling! 🧐 and Search again",
          imageName: "404.webp",
        };

      case "401":
        return {
          message:
            "Looks like we misplaced the keys! 🔑 Check the API key and let’s fix this.",
          imageName: "NoConnection.webp",
        };

      case "404":
        return {
          message:
            "Uh-oh! We couldn’t find that city. Did you mean Atlantis? 🌊",
          imageName: "404.webp",
        };

      case "500":
        return {
          message:
            "Yikes! Our weather servers need a coffee break. ☕ Try again in a bit.",
          imageName: "NoConnection3.webp",
        };

      case "503":
        return {
          message:
            "The weather elves are on strike right now. 🧝‍♂️ We’ll be back soon!",
          imageName: "NoConnection4.webp",
        };

      default:
        return {
          message: "Hmm, something strange happened. 🧐 Try again!",
          imageName: "NoConnection2.webp",
        };
    }
  };

  const { imageName, message } = getErrorMessage(errCode);
  return (
    <div
      className={`fixed top-0 z-10 flex h-full w-full flex-col items-center gap-y-2 bg-white font-oxanium dark:bg-[#181818]`}
    >
      {isLoading ? (
        <div className="mb-20 flex h-full w-[90%] flex-col items-center justify-center text-xl font-semibold italic text-blue-500 md:w-[60%]">
          <span className="ml-5 w-full text-2xl md:text-3xl">Hang on,</span>
          <span className="bottomToTop md:text-2xl">
            we're forecasting future!... ...
          </span>
        </div>
      ) : (
        <>
          <div className="mt-5 flex h-[43%] w-full justify-center md:h-[60%]">
            <img
              src={`/${imageName}`}
              alt=""
              className={`mt-9 h-full bg-cover ${imageName === "limit.webp" && "animate-bounce"} `}
            />
          </div>

          <div className="mt-16 flex w-full flex-col items-center justify-center gap-y-10">
            <span className="bottomToTop ml-5 w-[90%] text-start text-lg font-semibold italic text-blue-500 dark:text-white/90 md:text-center md:text-2xl">
              {message}
            </span>
            <button
              onClick={openSearchPage}
              className={`mt-10 flex h-9 w-52 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 pr-3 text-sm font-[500] italic text-white shadow-lg dark:bg-blue-600 md:hidden ${errCode === "429" ? "invisible" : "visible"}`}
            >
              <IoMdSearch className="size-6" />
              Search Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ErrPage);
