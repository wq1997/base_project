import Global from "./Global";
import User from "./User";
import { useSelector } from "umi";

const HomePage = () => {
    const { user, currentCompanyCode } = useSelector(state => state.user);
    const isShowGlobal = user?.isSermatec && !currentCompanyCode && user?.selfPermCodes?.includes('op:global_mode');
    const isShowUser = 
        !user?.isSermatec && currentCompanyCode && user?.selfPermCodes?.includes('op:user_mode') || 
        user?.isSermatec && currentCompanyCode && user?.selfPermCodes?.includes('op:user_mode') ||
        !user?.isSermatec && !currentCompanyCode && user?.selfPermCodes?.includes('op:user_mode');
    return (
        <div>
            {isShowGlobal&&<Global />}
            {isShowUser&&<User />}
        </div>
    )
}

export default HomePage;