import { useState, useEffect } from "react";
import centerTop1Img from "../../../../public/images/centerTop1.svg";
import centerTop2Img from "../../../../public/images/centerTop2.svg";
import centerTop3Img from "../../../../public/images/centerTop3.svg";
import centerTop4Img from "../../../../public/images/centerTop4.svg";
import { useRequest } from "ahooks";
import {
    getAllDtuIdsServe
} from "@/services/bigScreen";

const dataSource = [
    {
        imgUrl: centerTop1Img,
        description: '分布省份',
        data: 0,
        color: '#42F8E6'
    },
    {
        imgUrl: centerTop2Img,
        description: '总装机容量(MW)',
        data: 0,
        color: '#3AAFFF'
    },
    // {
    //     imgUrl: centerTop3Img,
    //     description: '设备落地总数',
    //     data: 0,
    //     color: '#C08BF1'
    // },
    {
        imgUrl: centerTop4Img,
        description: '运维员工数量',
        data: 0,
        color: '#F3F5A6'
    }
]

const CenterTopData = ({
    deviceType,
    areaType
}) => {
    const [myData, setMyData] = useState(dataSource);
    const { data, run } = useRequest(getAllDtuIdsServe, {
        pollingInterval: 1000*60*60*12, //12小时轮询一次
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
            cloneData[0].data = parseInt(result?.province);
            cloneData[1].data = parseInt(result?.Installed);
            // cloneData[2].data = parseInt(result?.dtuCount);
            cloneData[2].data = parseInt(result?.employee);
            setMyData(cloneData);
        }
    }, [data])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '5px'
            }}
        >
            {
                myData?.map(item => {
                    return (
                        <div
                            style={{
                                background: `#001435`,
                                padding: '10px 20px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <img src={item?.imgUrl} style={{width: '45px'}} />
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginLeft: 15
                                    }}
                                >
                                    <div style={{color: item?.color, fontSize: 25}}>{item?.data}</div>
                                    <div style={{color: 'white', fontSize: 12}}>{item?.description}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CenterTopData;