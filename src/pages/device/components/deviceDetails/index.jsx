import { useState } from "react";
import DeviceDetailOne from "./deviceDetail_1.0";
import DeviceDetailTwo from "./deviceDetail_2.0";

const DeviceDetails = ({deviceVersion}) => {
    return (
        <>
            {deviceVersion===7&&<DeviceDetailOne />}
            {deviceVersion===15&&<DeviceDetailTwo />}
        </>
    )
}

export default DeviceDetails;