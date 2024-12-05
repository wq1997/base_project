import { Spin } from "antd"
import { useEffect } from "react";
import { getQueryString } from "@/utils/utils";
import { useDispatch, history } from "umi";

const Auth = () => {
    const token = getQueryString("token");
    const dispatch = useDispatch();

    const getUser = async () => {
        const res = await dispatch({
            type: "user/queryUser",
        });
        let selfPermCodes = res?.selfPermCodes || [], path = "";
        if(selfPermCodes?.includes("menu:workbench4executor")){
            path = "/workbench/execution-roles";
        }
        if(selfPermCodes?.includes("menu:workbench4manager")){
            path = "/workbench/management-roles";
        }
        history.push(path);
    }

    useEffect(()=>{
        if(token) localStorage.setItem("Token", token);
        getUser();
    }, []);

    return (
        <Spin spinning/>
    )
}

export default Auth;