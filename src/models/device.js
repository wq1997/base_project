import { apiGetAllPlants} from "@/services/device"
import { setLocalStorage, getLocalStorage } from "@/utils/utils";

export default {
    namespace: 'device',

    state: {
      allPlant: null,
    },
   
    effects: {  
      *getAllPlants({ payload }, { call, put }) {
        const data= yield call(apiGetAllPlants);
        console.log(JSON.parse(data.data.data));
        setLocalStorage('allPlant',[
            ...(JSON.parse(data.data.data))
        ])
        yield put ({
            type:'updateState',
            payload:{
                allPlant:[
                    ...(JSON.parse(data.data.data))
                ]
            },
        })
      }
    },
   
    reducers: {
      updateState(state, { payload }) {
        console.log(state,payload);
        console.log( {
            ...state,
            ...payload,
          });
        return {
          ...state,
          ...payload,
        };
      },
    }
  };