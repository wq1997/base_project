
const MyRadio = ({checked}) => {
    return (
        <div>
            {
                checked?
                <div style={{width: '20px', height: '20px', borderRadius: '20px', border: '1px solid #00FF11', position: 'relative'}}>
                    <div 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '13px',
                            height: '13px',
                            borderRadius: '13px',
                            background: '#00FF11'
                        }}
                    />
                </div>
                :
                <div  style={{width: '20px', height: '20px', borderRadius: '20px', border: '1px solid #CCCCCC', position: 'relative'}}/>
            }
        </div>
    )
}

export default MyRadio;