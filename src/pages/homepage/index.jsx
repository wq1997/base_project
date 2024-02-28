import { useState } from "react";
import Global from "./Global";
import User from "./User";

const HomePage = () => {
    const [mode, setMode] = useState("Global");

    return (
        <div>
            {mode==="Global"? <Global />: <User />}
        </div>
    )
}

export default HomePage;