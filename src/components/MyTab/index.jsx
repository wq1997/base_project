

const MyTab = ({
    value,
    options,
    onChange
}) => {
    return (
        <div style={{display: 'flex', background: '#1B5680', cursor: 'pointer'}}>
            {
                options?.map(option => {
                    return (
                        <div 
                            style={{
                                color: 'white', 
                                padding: '5px 15px', 
                                background: value===option.value?'#FF9354': '#1B5680',
                                borderRadius: 5,
                                fontSize: 12
                            }}
                            onClick={()=>onChange&&onChange(option.value)}
                        >
                            {option.label}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyTab;