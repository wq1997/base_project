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

    const [plantId, setPlantId] = useState(allPlant?.[0]?.plantId);
    const [sceneType, setSceneType] = useState(allPlant?.[0]?.type);

    const onChange = (id) => {
        const data = allPlant.find(item=>item.plantId===id);
        if(data){
            setPlantId(id);
            setSceneType(data?.type)
        }
    }

    useEffect(()=>{
        setPlantId(allPlant?.[0]?.plantId);
        setSceneType(allPlant?.[0]?.type);
    }, [allPlant])

    useEffect(()=>{
        dispatch({ type: 'device/getAllPlants' });
    }, [])

    return (
        <div>
            {sceneType===1&&<Energy plantId={plantId} onChange={onChange}/>}
            {sceneType===2&&<Microgrids plantId={plantId} onChange={onChange}/>}
        </div>
    )
}

export default LargeScreen;