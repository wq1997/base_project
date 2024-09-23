import { logout as logoutServe, login } from "@/services/user"
import { getUserInfo as getUserInfoServe } from "@/services"
import { history } from "umi";
import { removeLocalStorage, getLoginPath } from "@/utils/utils";

export default {
  namespace: 'user',

  state: {
    user: null,
    publicKey: '',
  },

  effects: {
    *logout({ payload }, { call, put }) {
      let loginPath = getLoginPath();
      removeLocalStorage("Token");
      history.push(loginPath);
    },
    *saveData({ payload }, { put, select }) {
      yield put({ type: "updateState", payload });
      const data = yield select((state) => state.user);
      // const publicKey = yield select((state) => state.publicKey);
      // localStorage.setItem("publicKey", publicKey);
      sessionStorage.setItem("counterData", JSON.stringify(data));
    },
    *getUserInfo({ payload }, { put, select }) {
      const res = yield getUserInfoServe();
      if (res?.data?.data) {
        yield put({ type: "updateState", payload: { user: res?.data?.data } });
      }
    }
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