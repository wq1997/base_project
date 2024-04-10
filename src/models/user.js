import { getUserInfo } from "@/services"
import { history } from "umi";

export default {
    namespace: 'user',

    state: {
      user: null,
      currentCompanyCode: localStorage.getItem('currentCompanyCode') || '',
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
        localStorage.removeItem('currentCompanyCode');
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