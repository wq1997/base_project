export default {
    namespace: 'global',

    state: {
      theme: "default",
    },
   
    effects: {
      *changeTheme({ payload }, { call, put }) {
        console.log("theme", payload)
        const { theme } = payload;
        yield put({
            type: 'updateState',
            payload:{
                theme
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