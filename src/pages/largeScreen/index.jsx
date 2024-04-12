import { useState } from "react";
import Energy from "./energy";
import Microgrids from "./microgrids";
import { useSelector } from "umi";
import { getLocalStorage } from "@/utils/utils";

const LargeScreen = () => {
    const user = useSelector(state => state.user);
    const sceneType = user?.user?.sceneType || localStorage.getItem("sceneType");
    console.log('sceneType',sceneType,user?.user?.sceneType,localStorage.getItem("sceneType"));
    return (
        <div>
            {
                sceneType == 1?
                <Energy />
                :
                <Microgrids />
            }
        </div>
    )
}

export default LargeScreen;