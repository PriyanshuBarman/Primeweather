

// Function to convert UTC time to local time
export function getTime(utcTime, timeZone) {
  if (!utcTime || !timeZone) {
    return ;
  }
  try {
    // Create a Date object from the UTC time
    const date = new Date(utcTime);

    // Get the local time formatted as a string
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      // year: "numeric",
      // month: "2-digit",
      // day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Error converting time:", error);
    return null;
  }
}

// export Function to get the day name from UTC time
export function getDayName(utcTime, timeZone) {
  if (!utcTime || !timeZone) {
    return ;
  }
  try {
    // Create a Date object from the UTC time
    const date = new Date(utcTime);

    // Get the day name formatted as a string
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
    }).format(date);
  } catch (error) {
    console.error("Error getting day name:", error);
    return null;
  }
}
