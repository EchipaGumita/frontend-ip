export function getSessionStorageToken() {
    const token = sessionStorage.getItem("token");
    if (token) return token;
  }
  