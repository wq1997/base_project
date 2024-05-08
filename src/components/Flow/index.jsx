import { useEffect, useRef, useState } from "react";
import styles from "./index.less";

const Flow = ({
    img
}) => {
    const [timer, setTimer] = useState(null);

    const flowRef = useRef(null); // 管道
    const imgListRef = useRef(null); // 背景图列表
    const imgRef = useRef(null); // 单个背景图

    const [flowWidth, setFlowWidth] = useState(0);
    const [flowHeight, setFlowHeight] = useState(0);
    const [imgCount, setImgCount] = useState(0);

    const init = () => {
        const parentWidth = flowRef?.current?.parentElement?.clientWidth;
        const parentHeight = flowRef?.current?.parentElement?.clientHeight;
        setFlowWidth(parentWidth);
        setFlowHeight(parentHeight);
    }

    useEffect(() => {
        const singleImgWidth = imgRef?.current?.clientWidth;
        if(flowWidth<singleImgWidth){
            setImgCount(10)
        }else{
            setImgCount(Math.floor(flowWidth/singleImgWidth)*10);
        }
    }, [flowWidth, flowHeight])

    useEffect(() => {
        const imgListWidth = imgListRef?.current?.clientWidth;
        let right = 0;
        if(timer){
            clearInterval(timer);
            setTimer(null);
        }
        let newTimer = null
        newTimer = setInterval(()=>{
            if(imgListRef.current){
                imgListRef.current.style.right = `-${right}px`;
                if(right + 10 > imgListWidth - flowWidth){
                    setTimeout(()=>{
                        right = 0;
                    }, 0)
                }
                right=right+0.3;
            }
        }, 10);
        setTimer(newTimer);
    }, [imgCount])

    useEffect(()=>{
        init();
    }, []);

    return (
        <div 
            ref={flowRef} 
            className={styles.outer} 
            style={{height: flowHeight, overflow: 'hidden'}}
        >
            <div 
                ref={imgListRef} 
                className={styles.imgList} 
                style={{height: '100%', display: 'flex'}}
            >
                <img src={img} ref={imgRef} style={{height: '100%'}} />
                {
                    imgCount>0 &&
                    new Array(imgCount).fill(0)?.map(_=> {
                        return <img src={img} style={{height: '100%', marginLeft: flowWidth*0.2}} />
                    })
                }
            </div>
        </div>
    )
}

export default Flow;