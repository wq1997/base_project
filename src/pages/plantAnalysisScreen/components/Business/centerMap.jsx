
const CenterMap = ({
    dataSource
}) => {
    return (
        <div
            style={{width: '100%', height: '100px', position: 'relative'}}
        >
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', gap: 8}}>
                {
                    dataSource?.map(data => {
                        return (
                            <div
                                style={{
                                    width: '100%',
                                    background: `transparent url(/images/center.svg) center center no-repeat`,
                                    backgroundSize: 'cover',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px 20px',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <img src={data?.icon} style={{width: '30%', marginRight: 15}}/>
                                <div>
                                    <div style={{color: data?.fontColor, fontFamily: 'DingTalkJinBuTi', fontSize: 30}}>{data?.data}</div>
                                    <div style={{color: 'white', marginTop: 5}}>{data?.label}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CenterMap;