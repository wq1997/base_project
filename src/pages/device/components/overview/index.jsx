import { useState } from "react";
import OverViewOne from "./overview_1.0";
import OverViewTwo from "./overview_2.0";

const OverView = () => {
    const [deviceVersion, setDeviceVersion] = useState(2);

    return (
        <>
            {
                deviceVersion===1?
                <OverViewOne />
                :
                <OverViewTwo />
            }
        </>
    )
}

export default OverView;