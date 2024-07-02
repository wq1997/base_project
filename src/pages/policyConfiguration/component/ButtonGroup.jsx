import { Button, Space } from "antd";
import { useState, useEffect } from "react";

const ButtonGroup = (props) => {
    const {options, disabled, onChange, onControlledChange, style} = props;
    const [value, setValue] = useState(props.value);

    const onMyClick = (value) => {
        if(!disabled){
            if(props.mode==="controlled"){
                onControlledChange&&onControlledChange(value)
            }else{
                onChange&&onChange(value)
                setValue(value);
            }
        }
    }

    useEffect(()=>{
        setValue(props.value);
    }, [JSON.stringify(props)]);

    return (
        <Space size={20}>
            {
                options?.map(option => {
                    return (
                        <Button 
                            onClick={()=>onMyClick(option.value)}
                            style={{
                                height: 'unset',
                                fontSize: 14,
                                background:value===option.value?"linear-gradient(90deg, #0787DB 0%, #034FB4 100%)":"rgba(0,0,0,0.15)",
                                border: 'none',
                                ...style
                            }}
                        >
                            {option.label}
                        </Button>
                    )
                })
            }
        </Space>
    )
}

export default ButtonGroup;