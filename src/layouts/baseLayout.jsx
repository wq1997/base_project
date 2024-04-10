import MyMenu from "@/permissions/menu";
import CommonLayout from "./commonLayout";
import { useEffect } from "react";
import { useDispatch } from "umi"

const BaseLayout = () => {
   const dispatch = useDispatch();

   useEffect(() => {
        dispatch({
            type: 'user/queryUser',
        })
        return () => {
            localStorage.removeItem("currentCompanyCode");
        }
   }, [])

   return (
        <CommonLayout 
            MyMenu={MyMenu}
            title="采日能源VPP聚合平台"
        />
   )
};

export default BaseLayout;
