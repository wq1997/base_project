import { useState } from "react";
import PolicyConfiguration_one from "./policy_1.0";
import PolicyConfiguration_two from "./policy_2.0";

const PolicyConfiguration = ({deviceVersion}) => {
    return (
        <div>
            {deviceVersion===7&&<PolicyConfiguration_one deviceVersion={deviceVersion} />}
            {deviceVersion===15&&<PolicyConfiguration_two deviceVersion={deviceVersion} />}
        </div>
    )
}

export default PolicyConfiguration;