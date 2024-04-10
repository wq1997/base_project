import MyMenu from "@/permissions/menu";
import CommonLayout from "./commonLayout";

const BaseLayout = () => {
   return (
        <CommonLayout 
            MyMenu={MyMenu}
            title="采日运维管理系统"
        />
   )
};

export default BaseLayout;
