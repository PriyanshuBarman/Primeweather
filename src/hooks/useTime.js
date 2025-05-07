import { useEffect, useRef, useState } from "react";

export const useTime = (timeZone) => {
  const options = { hour12: true, hour: "numeric", minute: "numeric" }; // Edit options according to your needs

  const dateRef = useRef(new Date());
  const [currentTime, setCurrentTime] = useState(
    dateRef.current.toLocaleString("en-GB", { timeZone, ...options }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      dateRef.current = new Date(dateRef.current.getTime() + 1000);

      if (dateRef.current.getSeconds() === 0) {
        const added1Min = dateRef.current.toLocaleString("en-GB", {
          timeZone,
          ...options,
        });
        setCurrentTime(added1Min);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeZone]);

  return currentTime;
};
