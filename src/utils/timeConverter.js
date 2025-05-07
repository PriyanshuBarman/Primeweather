export function getTime(utcTime, timeZone) {
  if (!utcTime || !timeZone) return;
  const date = new Date(utcTime);
  return date.toLocaleTimeString("en-US", {
    timeStyle: "short",
    timeZone,
  });
}
export function getShortDayName(utcTime, timeZone) {
  if (!utcTime || !timeZone) return;
  const date = new Date(utcTime);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone,
  });
}
export function getLongDayName(utcTime, timeZone) {
  if (!utcTime || !timeZone) return;
  const date = new Date(utcTime);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone,
  });
}

export function isDaytime(currentTime, sunriseTime, sunsetTime) {
  const d = new Date();
  const date = d.toDateString();

  const currentDate = new Date(`${date} ${currentTime}`);
  const sunriseDate = new Date(`${date} ${sunriseTime}`);
  const sunsetDate = new Date(`${date} ${sunsetTime}`);

  return currentDate >= sunriseDate && currentDate <= sunsetDate;
}
