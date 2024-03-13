import { setLocale } from "umi";
import { setLocalStorage, getLocalStorage } from "@/utils/utils";
export default {
    namespace: 'global',

    state: {
      theme: getLocalStorage("theme") || "dark",
      locale: getLocalStorage('locale')||"zh-CN"
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
      *changeLanguage({ payload }, { call, put }) {
        const { locale } = payload;
        setLocale(locale, false);
        setLocalStorage('locale',locale);
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