import { defineStore } from "pinia";
import router from "../router";
import {
  loginUser,
  setHeader,
  deleteSession,
  removeToken,
} from "@/services/api.service";
import { resetAllStores } from "../utils";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
    isAdmin: (state) => state.user && state.user["is_admin"] === true,
  },

  actions: {
    async login(data) {
      const { email, password } = data;
      const res = await loginUser(email, password);
      if (res.status == 200) {
        setHeader(res["headers"]["authorization"]);
        this.user = res["data"]["user"];
        router.push("/");
      } else {
        console.log("error");
      }
    },

    async logout() {
      this.user = null;
      const res = await deleteSession();
      if (res.status == 200) {
        console.log(res);
      }
      resetAllStores();
      removeToken();
      router.push("/login");
    },
  },
});
