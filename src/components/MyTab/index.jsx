

const MyTab = ({
    value,
    options,
    onChange,
    btnStyle
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
                                background: value===option.value?'#00DF50': '#1B5680',
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
        </div>
    )
}

export default MyTab;