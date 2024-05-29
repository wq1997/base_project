import { login } from "@/services/user";
import { history } from "umi";

export default {
    namespace: "user",

    state: {
        user: null,
    },

    effects: {
        *queryUser({ payload }, { call, put }) {
            const userInfo = yield call(login, { username: "wangqing", password: "123456" });
            console.log("queryUser", userInfo);
            if (userInfo) {
                yield put({
                    type: "updateState",
                    payload: {
                        user: userInfo,
                    },
                });
            }
        },

        *logout({ payload }, { call, put }) {
            localStorage.removeItem("Token");
            localStorage.removeItem("plantDraft");
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
