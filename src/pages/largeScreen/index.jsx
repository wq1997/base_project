import { useState } from "react";
import Energy from "./energy";
import Microgrids from "./microgrids";
import { useSelector, useDispatch } from "umi";
import { useEffect } from "react";

const LargeScreen = () => {
    const dispatch = useDispatch();
    const { allPlant } = useSelector(function (state) {
        return state.device
    });

    const [sceneType, setSceneType] = useState(allPlant?.[0]?.type);

    const onChange = (id) => {
        const data = allPlant.find(item=>item.plantId===id);
        if(data){
            setSceneType(data?.type)
        }
    }

    useEffect(()=>{
        setSceneType(allPlant?.[0]?.type);
    }, [allPlant])

    useEffect(()=>{
        dispatch({ type: 'device/getAllPlants' });
    }, [])
    
    return (
        <div>
            {sceneType===1&&<Energy onChange={onChange}/>}
            {sceneType===2&&<Microgrids onChange={onChange}/>}
        </div>
    )
}

export default LargeScreen;