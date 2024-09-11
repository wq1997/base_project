import { Space } from "antd";

const MyButtonGroup = ({
    value,
    options,
    onChange,
    style
}) => {
    return (
        <div style={{display: 'flex', cursor: 'pointer'}}>
            <Space size={8}>
                {
                    options?.map(option => {
                        return (
                            <div 
                                style={{
                                    color: 'white', 
                                    padding: '5px 15px', 
                                    background: value===option.value?'#54CFFF': '#1B5680',
                                    borderRadius: 5,
                                    fontSize: 12,
                                    ...style
                                }}
                                onClick={()=>onChange&&onChange(option.value)}
                            >
                                {option.label}
                            </div>
                        )
                    })
                }
            </Space>
        </div>
    )
}

export default MyButtonGroup;