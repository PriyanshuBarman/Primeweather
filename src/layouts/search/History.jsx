import { memo } from "react";
import { MdOutlineHistory } from "react-icons/md";

function History({ handleSubmit, searchHistory, activeIdx, clearAllHistory }) {
  return (
    <ul className="History w-full">
      <div className="w-full text-right">
        <button
          onClick={clearAllHistory}
          className={
            "rounded-full bg-gradient-to-br from-red-300 to-red-400 px-3 py-0.5 text-[.66rem] font-[500] italic text-white shadow-md hover:bg-red-500 " +
            (!searchHistory?.length && " hidden")
          }
        >
          Clear
        </button>
      </div>
      {searchHistory?.map((item, idx) => (
        <li
          key={idx}
          onClick={(e) => handleSubmit(item.city)}
          className={`${activeIdx === idx && "bg-input"} dark:text-white hover:bg-black/5 dark:hover:bg-white/20 flex cursor-pointer place-items-center gap-4 rounded px-4 py-4`}
        >
          <MdOutlineHistory
            size={18}
            className="text-black/70 dark:text-white/70"
          />
          {item.city}
        </li>
      ))}
    </ul>
  );
}

export default memo(History);
