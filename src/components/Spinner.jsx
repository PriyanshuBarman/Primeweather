function Spinner({ thickness = 1 }) {
  return (
    <div
      className={`h-4 w-4 border-${thickness} animate-spin rounded-full border border-black border-t-transparent dark:border-t-transparent dark:border-white`}
    ></div>
  );
}
export default Spinner;
