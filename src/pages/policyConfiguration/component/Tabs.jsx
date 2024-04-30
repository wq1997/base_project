import { Space, theme, Badge } from "antd";
import { useState } from "react";

const Tabs = (props) => {
    const { token } = theme.useToken();
    const { items, onChange } = props;
    const [value, setValue] = useState(props.value);

    const onMyClick = (value) => {
        onChange&&onChange(value);
        setValue(value);
    }

    return (
        <Space size={30} style={{width: '100%'}}>
            {
                items?.map(item => {
                    return (
                        <div onClick={()=>onMyClick(item?.value)}>
                            <Badge 
                                style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                color={item?.value===value?token.colorPrimary:'#0D517E'} 
                                text={<div style={{color: item?.value===value?token.colorPrimary:'white'}}>{item.label}</div>} 
                            />
                        </div>
                    )
                })
            }
        </Space>
    )
}

export default Tabs;