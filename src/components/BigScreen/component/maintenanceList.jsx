import { useState } from "react";

const dataSource = [
    {
        imgUrl: '/images/maintenanceList1.svg',
        description: '当日总工单',
        data: 998
    },
    {
        imgUrl: '/images/maintenanceList2.svg',
        description: '总工单',
        data: 9998
    },
    {
        imgUrl: '/images/maintenanceList3.svg',
        description: '未处理工单',
        data: 10
    }
]

const MaintenanceList = () => {
    const [data, setData] = useState(dataSource);

    return(
        <div 
            style={{
                height: '100%',
                padding: '5px 10px 0 10px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            {
                data?.map(item => {
                    return(
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative'
                            }}
                        >
                            <div
                                style={{
                                    height: 'calc(100% - 20px)',
                                    background: `#00102B url(${item?.imgUrl}) center center`,
                                    backgroundSize: '100% 100%',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontSize: 20
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
                                    background: '#00102B url(/images/maintenanceListBg.png) center center',
                                    backgroundSize: '80% 100%',
                                    backgroundRepeat: 'no-repeat'
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