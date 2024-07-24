import { Space } from "antd";

const MyButtonGroup = ({
    value,
    options,
    onChange,
    btnStyle
}) => {
    return (
        <div style={{display: 'flex', cursor: 'pointer'}}>
            <Space size={5}>
                {
                    options?.map(option => {
                        return (
                            <div 
                                style={{
                                    color: 'white', 
                                    padding: '5px 15px', 
                                    background: value===option.value?'rgb(14, 204, 197)': '#1B5680',
                                    borderRadius: 5,
                                    fontSize: 12,
                                    ...btnStyle
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