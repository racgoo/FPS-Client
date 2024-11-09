export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie = "";
};
