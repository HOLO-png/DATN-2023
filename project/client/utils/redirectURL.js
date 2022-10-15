export const redirectURL = () =>
  window.location.search ? window.location.search.split("=")[1] : "/";
