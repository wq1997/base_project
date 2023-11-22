import { apiGetAllPlants,apiGetDtuList} from "@/services/total"
import { setLocalStorage, getLocalStorage } from "@/utils/utils";

export default {
    namespace: 'device',

    state: {
      allPlant: null,
      plantDetails:null
    },
   
    effects: {  
      *getAllPlants({ payload }, { call, put }) {
        const data= yield call(apiGetAllPlants);
        yield put({
            type:'updateState',
            payload:{
                allPlant:[  
                    ...(data.data.data)
                ]
            },
        })
      },
      *getAllPlantDetails({ payload }, { call, put }) {
        const data= yield call(apiGetDtuList,payload);
     
        yield put({
            type:'updateState',
            payload:{
              plantDetails:[  
                    ...(JSON.parse(data.data.data))
                ]
            },
        });

      }
    },
   
    reducers: {
      updateState(state, { payload }) {
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