import { login } from "@/services/user"

export default {
    namespace: 'user',

    state: {
      user: null,
    },
   
    effects: {
      *queryUser({ payload }, { call, put }) {
        const userInfo = yield call(login, { username: 'wangqing', password: '123456' });
        console.log("queryUser", userInfo)
        if(userInfo){
          yield put({
            type: 'updateState',
            payload: {
                user: userInfo
            }
          })
        }
      },

      *loginOut({ payload }, { call, put }) {
        console.log("loginOut")
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