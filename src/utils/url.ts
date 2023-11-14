export const getAPIUrl = () => {
  const url = import.meta.env.VITE_ENDPOINT || "";
  return url;
};
