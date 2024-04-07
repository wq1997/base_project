import { getUserInfo } from "@/services"
import { history } from "umi";

export default {
    namespace: 'user',

    state: {
      user: null,
    },
   
    effects: {
      *queryUser({ payload }, { call, put }) {
        const res = yield call(getUserInfo);
        if(res?.data?.data){
          const result = res?.data?.data;
          console.log(result);
          yield put({
            type: 'updateState',
            payload: {
                user: result
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