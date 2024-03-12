import { useState, useEffect } from "react";
import rightOne1Img from "../../../../public/images/rightOne_1.svg";
import rightOne2Img from "../../../../public/images/rightOne_2.svg";
import rightOne3Img from "../../../../public/images/rightOne_3.svg";
import {
    getOMInfoServe
} from "@/services/bigScreen";
import { useRequest } from "ahooks";

const dataSource = [
    {
        imgUrl: rightOne1Img,
        description: '运行监督天数',
        data: 0,
        color: '#C58CFB',
        unit: '天'
    },
    {
        imgUrl: rightOne2Img,
        description: '运行安全率',
        data: 0,
        color: '#37B0F9',
        unit: '%'
    },
    {
        imgUrl: rightOne3Img,
        description: '无事故天数',
        data: 0,
        color: '#2CF5D7',
        unit: '天'
    }
]

const OperationAll = ({
    deviceType,
    areaType
}) => {
    const [myData, setMyData] = useState(dataSource);
    const { data, run } = useRequest(getOMInfoServe, {
        pollingInterval: 1000*60*60*2, //12小时轮询一次
        manual: true,
    });

    useEffect(()=>{
        run({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
    }, [deviceType, areaType]);

    useEffect(()=>{
        if(data?.data?.data){
            const result = data?.data?.data;
            const cloneData = JSON.parse(JSON.stringify(myData));
            cloneData[0].data = parseInt(result?.runDays);
            cloneData[1].data = parseInt(result?.safetyRate);
            cloneData[2].data = parseInt(result?.NoAccidentsDays);
            setMyData(cloneData);
        }
    }, [data])

    return (
        <div
            style={{
                height: '100%',
                padding: '10px 10px 0 10px',
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {
                myData?.map(item => {
                    return(
                        <div 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `#00102B url(/images/rightOneBg.png) center center`,
                                backgroundSize: '100% 100%',
                                height: '100%'
                            }}
                        >
                            <img src={item?.imgUrl} style={{width: 45}}/>
                            <div
                                style={{
                                    marginLeft: 15,
                                    textAlign: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div style={{color: item?.color, fontSize: 20, fontFamily: 'electronicFont'}}>{item?.data}</div>
                                    <div style={{color: 'white', fontSize: 10, marginLeft: 5}}>{item?.unit}</div>
                                </div>
                                <div style={{color: 'white', fontSize: 12}}>{item?.description}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OperationAll;