import { useState, useEffect, useRef } from "react";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Flow } from "@/components";
import dlImg from "@/assets/imges/dl.svg";
import fzxtlImg from "@/assets/imges/fzxtl.svg";
import nyxtlImg from "@/assets/imges/nyxtl.svg"

const loadSystemLineWidthPercent = 0.3; // 线的百分比，自定义
const schematicDiagramIconPrecent = 0.7; 
const loadSystemAngle = 25; // 负载系统的角度

const energySystemLineWidthPercent = 0.4;
const energySystemChargingAngle = 155; // 储能系统充电的角度
const energySystemDisChargingAngle = 25; // 储能系统放电的角度
const energySystemIconPrecent = 0.4; 

const citySystemLineWidthPercent = 0.4; // 线的百分比，自定义
const citySystemChargingAngle = 90;

const SchematicDiagram = () => {
    const schematicDiagramRef = useRef();
    const [schematicDiagramColHardWidth, setSchematicDiagramColHardWidth] = useState(0);
    const [loadSystemLineWidth, setLoadSystemLineWidth] = useState(0);
    const [loadSystemIconWidth, setLoadSystemIconWidth] = useState(0); // 负载系统图标宽度
    const [energySystemLineWidth, setEnergySystemLineWidth] = useState(0);
    const [energySystemStatus, setEnergySystemStatus] = useState(1); // 大于0代表放电，小于0代表充电，等于0代表待机
    const [energySystemIconWidth, setEnrgySystemIconWidth] = useState(0); // 负载系统图标宽度
    const [citySystemLineWidth, setCitySystemLineWidth] = useState(0);


    const centerStyle = useEmotionCss(()=>{
        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%)'
        }
    })

    const titleStyle = useEmotionCss(()=>{
        return {
            color: '#01C8FF', 
            fontSize: 24, 
            fontWeight: 500
        }
    })

    const initLineWidth = () => {
        const schematicDiagramRowHarfWidth = schematicDiagramRef?.current?.clientWidth/2;
        const schematicDiagramColHardWidth = schematicDiagramRef?.current?.clientHeight/2;
        setSchematicDiagramColHardWidth(schematicDiagramColHardWidth);

        const loadSystemRowWidth = schematicDiagramRowHarfWidth*loadSystemLineWidthPercent;
        const loadSystemColWidth = schematicDiagramColHardWidth*loadSystemLineWidthPercent;
        const loadSystemDiagonalLength = loadSystemRowWidth*loadSystemRowWidth + loadSystemColWidth*loadSystemColWidth;
        const loadSystemLineWidth = Math.sqrt(loadSystemDiagonalLength);
        setLoadSystemIconWidth(loadSystemLineWidth*schematicDiagramIconPrecent);
        setLoadSystemLineWidth(loadSystemLineWidth);

        const energySystemRowWidth = schematicDiagramRowHarfWidth*energySystemLineWidthPercent;
        const energySystemColWidth = schematicDiagramColHardWidth*energySystemLineWidthPercent;
        const energySystemDiagonalLength = energySystemRowWidth*energySystemRowWidth + energySystemColWidth*energySystemColWidth;
        const energySystemLineWidth = Math.sqrt(energySystemDiagonalLength);
        setEnrgySystemIconWidth(energySystemLineWidth*energySystemIconPrecent);
        setEnergySystemLineWidth(energySystemLineWidth);

        setCitySystemLineWidth(schematicDiagramColHardWidth*citySystemLineWidthPercent);
    }

    useEffect(()=>{
        initLineWidth();
        window.addEventListener("resize", () => {
            initLineWidth();
        })
    }, [])

    return (
        <div
            ref={schematicDiagramRef}
            style={{width: '100%', height: '100%', position: 'relative'}}
        >

            <div
                style={{
                    width: '200px',
                    height: '64px',
                    background: '#08213E',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, rgba(87, 223, 254, 1), rgba(40, 104, 255, 1)) 2 2',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: schematicDiagramColHardWidth - citySystemLineWidth - 64
                }}
            >
                <div className={titleStyle} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>市电系统</div>
                <div style={{position: 'absolute', right: -70, top: 20}}>
                    功率：
                </div>
            </div>
            {/* 市电系统 */}
            <div className={centerStyle}>
                <div 
                    style={{
                        position: 'relative',
                        width: citySystemLineWidth, 
                        height: '5px',
                        top: -citySystemLineWidth,
                        transform: `rotate(${citySystemChargingAngle}deg)`,
                        transformOrigin: '0px 3px',
                        background: '#244A75'
                    }}
                >
                    <Flow img={dlImg} />
                </div>
            </div>

            {/* 储能系统 */}
            <div className={centerStyle}>
                {/* 充电状态 */}
                {
                    energySystemStatus<0&&
                    <div 
                        style={{
                            position: 'absolute',
                            width: energySystemLineWidth, 
                            height: '5px',
                            transform: `rotate(${energySystemChargingAngle}deg)`,
                            transformOrigin: '0px 0px',
                            background: '#244A75',
                            zIndex: 100
                        }}
                    >
                        <Flow img={dlImg} />
                    </div>
                }

                {/* 放电状态 */}
                {
                    energySystemStatus>0&&
                    <div 
                        style={{
                            position: 'absolute',
                            top: Math.sin(energySystemDisChargingAngle * Math.PI / 180) * energySystemLineWidth,
                            left: - Math.cos(energySystemDisChargingAngle * Math.PI / 180) * energySystemLineWidth,
                            width: energySystemLineWidth, 
                            transform: `rotate(${-energySystemDisChargingAngle}deg)`,
                            transformOrigin: '-0px 0px',
                            height: '5px',
                            zIndex: 100
                        }}
                    >
                        <Flow img={dlImg} />
                    </div>
                }

                <div 
                    style={{
                        position: 'absolute',
                        width: energySystemLineWidth, 
                        height: '5px',
                        transform: `rotate(${energySystemChargingAngle}deg)`,
                        transformOrigin: '0px 0px',
                        background: energySystemStatus===0?'#244A75': 'transparent',
                        zIndex: 200
                    }}
                >
                    <img 
                        src={nyxtlImg} 
                        style={{
                            position: 'absolute', 
                            right:  -energySystemIconWidth/2, 
                            top: -energySystemIconWidth/2-20,
                            width: energySystemIconWidth,
                            transform: `rotate(-${energySystemChargingAngle}deg)`,
                            zIndex: 200
                        }} 
                    />
                    <div
                        style={{
                            position: 'absolute', 
                            right: - energySystemIconWidth/2 - 170, 
                            top: Math.tan((180 - energySystemChargingAngle - 40) * Math.PI / 180) * (- energySystemIconWidth/2 - 170),
                            transform: `rotate(-${energySystemChargingAngle}deg)`,
                        }} 
                    >
                        <div className={titleStyle}>
                            储能系统
                        </div>
                        <div style={{margin: '10px 0'}}>运行状态：</div>
                        <div>功率：</div>
                    </div>
                </div>
            </div>


            {/* 负载系统 */}
            <div className={centerStyle}>
                <div 
                    style={{
                        position: 'relative',
                        width: loadSystemLineWidth, 
                        height: '5px',
                        transform: `rotate(${loadSystemAngle}deg)`,
                        transformOrigin: '0px 0px',
                        background: '#244A75'
                    }}>
                        <Flow img={dlImg} />
                        <img 
                            src={fzxtlImg} 
                            style={{
                                position: 'absolute', 
                                right:  -loadSystemIconWidth/2, 
                                top: -loadSystemIconWidth/2-20,
                                width: loadSystemIconWidth,
                                transform: `rotate(-${loadSystemAngle}deg)`,
                            }} 
                        >
                        </img>
                        <div
                            style={{
                                position: 'absolute', 
                                right:  - loadSystemIconWidth - 40, 
                                top: Math.tan((loadSystemAngle + 10) * Math.PI / 180) * (- loadSystemIconWidth - 40),
                                transform: `rotate(-${loadSystemAngle}deg)`,
                            }} 
                        >
                            <div className={titleStyle}>
                                负载系统
                            </div>
                            <div style={{margin: '10px 0'}}>运行状态：</div>
                            <div>功率：</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SchematicDiagram;