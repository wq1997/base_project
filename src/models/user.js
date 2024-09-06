import { history } from "umi";
import {
  homeGetMainPageData as homeGetMainPageDataServe
} from "@/services";

export default {
    namespace: 'user',

    state: {
      user: null,
    },
   
    effects: {
      *queryUser({ payload }, { call, put }) {
        const res = yield call(homeGetMainPageDataServe);
        if(res?.data?.status==="SUCCESS"){
          yield put({
            type: 'updateState',
            payload: {
                user: res?.data?.data
            }
          })
        }
      },

      *logout({ payload }, { call, put }) {
        history.push("/login")
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