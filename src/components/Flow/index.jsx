import { useEffect, useRef, useState } from "react";
import styles from "./index.less";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from 'antd';
import classNames from "classnames";

const Flow = ({
    img
}) => {
    const { token } = theme.useToken();
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
        if(flowWidth < singleImgWidth){
            setImgCount(10);
        }else{
            setImgCount(Math.floor(flowWidth/singleImgWidth)*10);
        }
    }, [flowHeight])

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
                if(right + 50 > imgListWidth - flowWidth){
                    setTimeout(()=>{
                        right = 0;
                    }, 0)
                }
                right=right+0.3;
            }
        }, 10);
        setTimer(newTimer);
    }, [imgCount, flowWidth])

    useEffect(()=>{
        setTimeout(()=>{init()}, 500)
    }, []);

    const outerStyle = useEmotionCss(()=>{
        return {
            background: token.color24
        }
    })

    return (
        <div 
            ref={flowRef} 
            className={classNames(styles.outer, outerStyle)} 
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
                        return <img src={img} style={{height: '100%'}} />
                    })
                }
            </div>
        </div>
    )
}

export default Flow;