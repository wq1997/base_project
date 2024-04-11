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
          yield put({
            type: 'updateState',
            payload: {
                user: result
            }
          })
        }
      },

      *clearCurrentCompanyCode({ payload }, { call, put }){
        yield put({
            type: 'updateState',
            payload: {
                currentCompanyCode: ""
            }
        })
        localStorage.removeItem('currentCompanyCode', '');
      },

      *logout({ payload }, { call, put }) {
        yield put({type: 'clearCurrentCompanyCode'});
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