import { useState } from "react";
import PolicyConfiguration_one from "./policy_1.0";
import PolicyConfiguration_two from "./policy_2.0";

const PolicyConfiguration = () => {
    const [deviceVersion, setDeviceVersion] = useState(2)
    return (
        <div>
            {
                deviceVersion===1?
                <PolicyConfiguration_one />
                :
                <PolicyConfiguration_two />
            }
        </div>
    )
}

export default PolicyConfiguration;