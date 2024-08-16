import { Space, theme, Badge, message } from "antd";
import { useState, useEffect } from "react";
import { useIntl } from "umi";

const Tabs = (props) => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const { items, onChange, canChange=true, messageId } = props;
    const [value, setValue] = useState(props.value);

    const onMyClick = (value) => {
        if(canChange){
            onChange&&onChange(value);
            setValue(value);
        }else{
            message.error(intl.formatMessage({id: messageId}));
        }
    }

    useEffect(()=>{
        setValue(props.value);
    }, [JSON.stringify(props)])

    return (
        <Space size={30}>
            {
                items?.map(item => {
                    return (
                        <div onClick={()=>onMyClick(item?.value)}>
                            <Badge 
                                style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                color={item?.value===value?token.colorPrimary:'#0D517E'} 
                                text={<div style={{color: item?.value===value?token.colorPrimary:token.color5, fontSize: 14}}>{item.label}</div>} 
                            />
                        </div>
                    )
                })
            }
        </Space>
    )
}

export default Tabs;