import { setLocale } from "umi";
import { setLocalStorage, getLocalStorage } from "@/utils/utils";
import { changeBaseLanguage } from "@/services"
export default {
    namespace: 'global',

    state: {
      theme: getLocalStorage('theme') || "dark",
      locale: getLocalStorage('locale')||"en-US"
    },
   
    effects: {
      *changeTheme({ payload }, { call, put }) {
        const { theme } = payload;
        yield put({
            type: 'updateState',
            payload:{
                theme
            }
        })
      },
      *changeLanguage({ payload }, { call, put } ) {
        const { locale } = payload;
        setLocale(locale, false);
        setLocalStorage('locale',locale);
        if (window.location.pathname !== "/login") {
          yield changeBaseLanguage({ language: locale === "zh-CN" ? 1 : 3 });
        }
        yield put({
            type: 'updateState',
            payload:{
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