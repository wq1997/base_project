import { logout as logoutServe, login } from "@/services/user"
import { history } from "umi";
import { removeLocalStorage } from "@/utils/utils";

export default {
  namespace: 'user',

  state: {
    user: [],
    publicKey:'',
  },

  effects: {
    *logout({ payload }, { call, put }) {
      removeLocalStorage("Token");
      history.push("/login");
    },
    *saveData({ payload }, { put, select }) {
      yield put({ type: "updateState", payload });
      const data = yield select((state) => state.user);
      // const publicKey = yield select((state) => state.publicKey);
      // sessionStorage.setItem("counterData", JSON.stringify(publicKey));
      sessionStorage.setItem("counterData", JSON.stringify(data));
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {  
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const data = sessionStorage.getItem("counterData");
      if (data) {
        dispatch({ type: "saveData", payload: JSON.parse(data) });
      }
      // 监听 window.beforeunload 事件
      window.addEventListener("beforeunload", () => {
        dispatch({ type: "saveData" });
      });
    },
  },

};