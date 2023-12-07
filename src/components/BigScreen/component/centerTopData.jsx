import { useState } from 'react';
import centerTop1Img from "../../../../public/images/centerTop1.svg";
import centerTop2Img from "../../../../public/images/centerTop2.svg";
import centerTop3Img from "../../../../public/images/centerTop3.svg";
import centerTop4Img from "../../../../public/images/centerTop4.svg";

const dataSource = [
    {
        imgUrl: centerTop1Img,
        description: '分布省份',
        data: 16,
        color: '#42F8E6'
    },
    {
        imgUrl: centerTop2Img,
        description: '总装机容量',
        data: 10000,
        color: '#3AAFFF'
    },
    {
        imgUrl: centerTop3Img,
        description: '设备落地总数',
        data: 10,
        color: '#C08BF1'
    },
    {
        imgUrl: centerTop4Img,
        description: '运维员工数量',
        data: 1000,
        color: '#F3F5A6'
    }
]

const CenterTopData = () => {
    const [data, setData] = useState(dataSource);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '5px'
            }}
        >
            {
                data?.map(item => {
                    return (
                        <div
                            style={{
                                background: `#00102B url(/images/centerTopBg.png) center center`,
                                backgroundSize: '100% 100%',
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
                                    <div style={{color: item?.color, fontSize: 30}}>{item?.data}</div>
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