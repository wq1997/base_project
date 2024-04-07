import Global from "./Global";
import User from "./User";
import { useSelector } from "umi";

const HomePage = () => {
    const { user } = useSelector(state => state.user);
    const isShowGlobal = user?.isSermatec && user?.selfPermCodes?.includes('op:global_mode');
    const isShowUser = !user?.isSermatec && user?.selfPermCodes?.includes('op:user_mode');
    return (
        <div>
            {isShowGlobal&&<Global />}
            {isShowUser&&<User />}
        </div>
    )
}

export default HomePage;