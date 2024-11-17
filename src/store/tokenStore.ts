/**import { create } from "zustand";
import { getLocalStorageToken } from "../utils/getLocalStorageToken";
import { getSessionStorageToken } from "../utils/getSessionStorageToken";

type UserTokenStore = {
  token: string;
  errorToken: string;
  isLoadingToken: boolean;
  loadingToken: () => void;
  loadToken: (token: string) => void;
  loadErrorToken: (error: string) => void;
  removeToken: () => void;
};

export const useTokenStore = create<UserTokenStore>((set) => ({
  token: getLocalStorageToken() ?? getSessionStorageToken() ?? "",
  errorToken: "",
  isLoadingToken: false,
  loadingToken: () => {
    set({
      isLoadingToken: true,
    });
  },
  loadToken: (token) => {
    set({
      token,
      isLoadingToken: false,
    });
  },
  loadErrorToken: (error) => {
    set({ errorToken: error, isLoadingToken: false });
  },
  removeToken: () => set({ token: "" }),
}));*/
