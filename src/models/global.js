import { setLocale } from "umi";
import { setLocalStorage, getLocalStorage } from "@/utils/utils";
import { changeBaseLanguage } from "@/services"

export default {
  namespace: 'global',

  state: {
    theme: getLocalStorage('theme') || "dark",
    locale: getLocalStorage('locale') || "zh-CN"
  },

  effects: {
    *changeTheme({ payload }, { call, put }) {
      const { theme } = payload;
      yield put({
        type: 'updateState',
        payload: {
          theme
        }
      })
    },
    *changeLanguage({ payload }, { call, put }) {
      const { locale } = payload;
      setLocale(locale, false);
      setLocalStorage('locale', locale);
      let loginPath;
      if(
          window.location.hostname === "domestic-power.sermatec-cloud.com" ||
          window.location.hostname === "localhost" ||
          window.location.hostname === "192.168.1.42"
      ){
          loginPath = "/login";
      }else{
          loginPath = "/login-gdgy";
      }
      if (window.location.pathname !== loginPath) {
        yield changeBaseLanguage({ language: locale === "zh-EN" ? 3 : 1 });
      }
      yield put({
        type: 'updateState',
        payload: {
          locale
        }
      })
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