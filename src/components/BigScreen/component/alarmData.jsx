import { useState } from "react";
import rightTwo1Img from "../../../../public/images/rightTwo_1.svg";
import rightTwo2Img from "../../../../public/images/rightTwo_2.svg";
import rightTwo3Img from "../../../../public/images/rightTwo_3.svg";

const dataSource = [
    {
        imgUrl: rightTwo1Img,
        description: '当前报警设备数',
        data: 0,
        color: '#2ACABD',
    },
    {
        imgUrl: rightTwo2Img,
        description: '历史报警总数',
        data: 100,
        color: '#FB0017',
    },
    {
        imgUrl: rightTwo3Img,
        description: '风险设备数',
        data: 3,
        color: '#F6F8A9',
    }
]

const AlarmData = () => {
    const [data, setData] = useState(dataSource);

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
                data?.map(item => {
                    return(
                        <div 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `#002955`,
                                borderRadius: 16,
                                height: '100%'
                            }}
                        >
                            <img src={item?.imgUrl} style={{width: 40}}/>
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
                                    <div style={{color: item?.color, fontSize: 25, fontFamily: 'electronicFont'}}>{item?.data}</div>
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

export default AlarmData;