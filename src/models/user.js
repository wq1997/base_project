import { logout as logoutServe } from "@/services/user"
import { history } from "umi";
import { removeLocalStorage } from "@/utils/utils";

export default {
    namespace: 'user',

    state: {
      user: null,
    },
   
    effects: {
      *logout({ payload }, { call, put }) {
        removeLocalStorage("Token");
        history.push("/login");
      }
    },
   
    reducers: {
      updateState(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    }
  };