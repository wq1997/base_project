import { Button, Space } from "antd";
import { useState } from "react";

const ButtonGroup = (props) => {
    const {options, onChange} = props;
    const [value, setValue] = useState(props.value);

    const onMyClick = (value) => {
        onChange&&onChange(value)
        setValue(value);
    }
    
    return (
        <Space size={20}>
            {
                options?.map(option => {
                    return (
                        <Button 
                            onClick={()=>onMyClick(option.value)}
                            style={{
                                background:value===option.value?"linear-gradient(90deg, #0787DB 0%, #034FB4 100%)":"rgba(0,0,0,0.15)",
                                border: 'none'
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