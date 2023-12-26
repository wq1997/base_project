import { useState, useEffect } from "react";
import {
    getOMOverviewServe
} from "@/services/bigScreen";
import { useRequest } from "ahooks";

const dataSource = [
    {
        imgUrl: '/images/maintenanceList1.svg',
        description: '当日总工单',
        data: 0
    },
    {
        imgUrl: '/images/maintenanceList2.svg',
        description: '总工单',
        data: 0
    },
    {
        imgUrl: '/images/maintenanceList3.svg',
        description: '未处理工单',
        data: 0
    }
]

const MaintenanceList = ({
    deviceType,
    areaType
}) => {
    const [myData, setMyData] = useState(dataSource);
    const { data, run } = useRequest(getOMOverviewServe, {
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
            cloneData[0].data = parseInt(result?.todayOrderCounts);
            cloneData[1].data = parseInt(result?.totalOrderCounts);
            cloneData[2].data = parseInt(result?.unFinishedOrderCounts);
            setMyData(cloneData);
        }
    }, [data])
    return(
        <div 
            style={{
                height: '100%',
                padding: '5px 10px 0 10px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
            }}
        >
            {
                myData?.map(item => {
                    return(
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    height: 'calc(100% - 20px)',
                                    background: `transparent url(${item?.imgUrl}) center center`,
                                    backgroundSize: '100% 90%',
                                    backgroundRepeat: 'no-repeat',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontSize: 18
                                }}
                            >
                                {item?.data}
                            </div>
                            <div
                                style={{
                                    height: '20px',
                                    color: 'white',
                                    textAlign: 'center',
                                    lineHeight: '20px',
                                    fontSize: '10px',
                                }}
                            >
                                {item?.description}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MaintenanceList;