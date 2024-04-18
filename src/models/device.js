import { apiGetAllPlants, apiGetDtuList } from "@/services/total"
// import { getFetchPlantList } from "@/services/device"
import { setLocalStorage, getLocalStorage } from "@/utils/utils";

export default {
  namespace: 'device',

  state: {
    allPlant: null,
    plantDetails: {
      model: ['PCS', 'BMS', 'C', 'PV', 'OC'],
      info: []
    },
    realData: [],
    currentPlantId:''
  },

  effects: {
    // *getAllPlants({ payload }, { call, put }) {
    //   const data = yield call(apiGetAllPlants);
    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       allPlant: [
    //         ...(data.data.data)
    //       ]
    //     },
    //   })
    // },
    // *getAllPlantDetails({ payload }, { call, put }) {
    //   const data = yield call(apiGetDtuList, payload);
    //   let id=payload.plantId;
    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       plantDetails: {
    //         ...(data.data.data)
    //       },
    //       // currentPlantId:id,
    //     },
    //   });
    // },

    *saveData({ payload }, { put, select }) {
      yield put({ type: "updateState", payload });
      const data = yield select((state) => state.device);
      sessionStorage.setItem("counterData", JSON.stringify(data));
    },

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