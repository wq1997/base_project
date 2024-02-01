import { useState } from "react";
import Energy from "./energy";
import Microgrids from "./microgrids";

const LargeScreen = () => {
    const [isEnergy, setIsEnergy] = useState(true);
    return (
        <div>
            {
                isEnergy?
                <Energy />
                :
                <Microgrids />
            }
        </div>
    )
}

export default LargeScreen;