import { useState } from "react";
import RunningView1Img from "../../../../public/images/RunningView1.svg";
import RunningView2Img from "../../../../public/images/RunningView2.svg";
import RunningView3Img from "../../../../public/images/RunningView3.svg";
import RunningView4Img from "../../../../public/images/RunningView4.svg";

const dataSource = [
    {
        imgUrl: RunningView1Img,
        description: '当前运行设备',
        data: 668,
        unit: '台',
        bgImgUrl: '/images/leftTopOne_1.png',
        color:'#36FEE8'
    },
    {
        imgUrl: RunningView2Img,
        description: '累计充电电量',
        data: 10000,
        unit: 'kw',
        bgImgUrl: '/images/leftTopOne_2.png',
        color:'#934CEA'
    },
    {
        imgUrl: RunningView3Img,
        description: '累计放电电量',
        data: 1000,
        unit: 'kw',
        bgImgUrl: '/images/leftTopOne_3.png',
        color:'#38ACF6'
    },
    {
        imgUrl: RunningView4Img,
        description: '平均充放电效率',
        data: '100%',
        unit: '',
        bgImgUrl: '/images/leftTopOne_4.png',
        color:'#F0F466'
    },
]

const RunningView = () => {
    const [data, setData] = useState(dataSource);

    return (
        <div 
            style={{
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
                                background: `#00102B url(${item?.bgImgUrl}) center center`,
                                backgroundSize: '100% 100%',
                                padding: '10px 20px',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >   
                            <div>
                                <div style={{display: 'flex', alignItems: 'baseline', textAlign: 'center', justifyContent: 'center'}}>
                                    <div style={{color: item?.color, fontSize: 25}}>{item?.data}</div>
                                    <div style={{fontSize: 15, color: 'white'}}>{item?.unit}</div>
                                </div>
                                <div style={{color: 'white', margin: '5px 0', fontSize: 12}}>{item?.description}</div>
                                <img src={item?.imgUrl} style={{width: 45}} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RunningView;