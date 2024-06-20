import { login } from "@/services/user";
import { history } from "umi";
import { getUserInfo } from "@/services/user";

export default {
    namespace: "user",

    state: {
        userInfo: null,
    },

    effects: {
        *queryUser({ payload }, { call, put }) {
            const res = yield call(getUserInfo);
            if (res?.data?.code == 200) {
                yield put({
                    type: "updateState",
                    payload: {
                        userInfo: res?.data?.data,
                    },
                });
            }
        },

        *logout({ payload }, { call, put }) {
            console.log('logout')
            localStorage.removeItem("Token");
            localStorage.removeItem("plantDraft");
            localStorage.removeItem("deviceDraft");
            history.push("/login");
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
};
