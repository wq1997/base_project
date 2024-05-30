import { useState, useEffect } from "react";
import RunningView1Img from "../../../assets/images/RunningView1.svg";
import RunningView2Img from "../../../assets/images/RunningView2.svg";
import RunningView3Img from "../../../assets/images/RunningView3.svg";
import RunningView4Img from "../../../assets/images/RunningView4.svg";
import { useRequest } from "ahooks";
import {
    getAllDtuRunStatusServe
} from "@/services/bigScreen";

const dataSource = [
    {
        imgUrl: RunningView1Img,
        description: '当前运行设备',
        data: 0,
        unit: '台',
        bgImgUrl: '/images/leftTopOne_1.png',
        color:'#36FEE8'
    },
    {
        imgUrl: RunningView2Img,
        description: '累计充电电量',
        data: 0,
        unit: 'MWh',
        bgImgUrl: '/images/leftTopOne_2.png',
        color:'#934CEA'
    },
    {
        imgUrl: RunningView3Img,
        description: '累计放电电量',
        data: 0,
        unit: 'MWh',
        bgImgUrl: '/images/leftTopOne_3.png',
        color:'#38ACF6'
    },
    {
        imgUrl: RunningView4Img,
        description: '平均充放电效率',
        data: '0',
        unit: '%',
        bgImgUrl: '/images/leftTopOne_4.png',
        color:'#F0F466'
    },
]

const RunningView = ({
    deviceType,
    areaType
}) => {
    const [myData, setMyData] = useState(dataSource);
    const { data, run } = useRequest(getAllDtuRunStatusServe, {
        pollingInterval: 1000*60*60*2, //2小时轮询一次
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
            cloneData[0].data = parseInt(result?.nowCount);
            cloneData[1].data = parseInt(result?.totalCharge);
            cloneData[2].data = parseInt(result?.totalDisCharge);
            cloneData[3].data = parseInt(result?.efficiencyAvg * 100);
            setMyData(cloneData);
        }
    }, [data])

    return (
        <div 
            style={{
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '5px',
            }}
        >
            {
                myData?.map(item => {
                    return (
                        <div
                            style={{
                                background: `#00102B url(${item?.bgImgUrl}) center center`,
                                backgroundSize: '100% 100%',
                                padding: '10px 10px',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >   
                            <div>
                                <div style={{display: 'flex', alignItems: 'baseline', textAlign: 'center', justifyContent: 'center'}}>
                                    <div style={{color: item?.color, fontSize: 20}}>{item?.data}</div>
                                    <div style={{fontSize: 10, color: 'white'}}>{item?.unit}</div>
                                </div>
                                <div style={{color: 'white', margin: '10px 0', fontSize: 12, whiteSpace: 'nowrap'}}>{item?.description}</div>
                                {/* <img src={item?.imgUrl} style={{width: 45}} /> */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RunningView;