export const getLocalSearchHistory = () => {
  const storedHistory = localStorage.getItem("searchHistory");
  if (!storedHistory) return [];
  return JSON.parse(storedHistory);
};
export const setLocalSearchHistory = (newHistory) =>
  localStorage.setItem("searchHistory", JSON.stringify(newHistory));
