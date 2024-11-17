export function getLocalStorageToken() {
    const token = localStorage.getItem("token");
    if (token) return token;
  }
  