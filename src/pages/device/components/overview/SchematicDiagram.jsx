import { useState, useEffect, useRef } from "react";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Flow } from "@/components";
import dlImg from "@/assets/imges/dl.svg";
import fzxtlImg from "@/assets/imges/fzxtl.svg";

const SchematicDiagram = () => {
    const schematicDiagramRef = useRef();
    const [lineWidth, setLineWidth] = useState(0);

    const centerStyle = useEmotionCss(()=>{
        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%)'
        }
    })

    useEffect(()=>{

    }, [])

    return (
        <div
            ref={schematicDiagramRef}
            style={{width: '100%', height: '100%', position: 'relative'}}
        >
            {/* 负载系统 */}
            <div
                className={centerStyle}
            >
                <div 
                    style={{
                        position: 'relative',
                        width: '500px', 
                        height: '5px',
                        transform: 'rotate(35deg)',
                        transformOrigin: '0px 0px'
                    }}>
                        <Flow img={dlImg} />
                        <img 
                            src={fzxtlImg} 
                            style={{
                                position: 'absolute', 
                                right: -100, 
                                top: -100,
                                width: 150,
                                transform: 'rotate(-35deg)',
                            }} 
                        />
                    </div>
                </div>
        </div>
    )
}

export default SchematicDiagram;