import MyMenu from "@/permissions/menu";
import CommonLayout from "./commonLayout";

const BaseLayout = () => {
   return (
        <CommonLayout 
            MyMenu={MyMenu}
            title="采日VPP聚合平台"
        />
   )
};

export default BaseLayout;
