
const SocialBenefits = ({data}) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
            {
                data?.map(item => {
                    return (
                        <div style={{flex: 1}}>
                            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                                <img 
                                    style={{
                                        width: '20%'
                                    }}
                                    src={item?.icon} 
                                />
                            </div>
                            <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', margin: '5px 0'}}>
                                <span style={{color: '#FFFFFF', fontSize: 25, fontFamily: 'DingTalkJinBuTi'}}>{item?.data}</span>
                                <span style={{color: '#999', marginLeft: 2}}>{item?.unit}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', color: '#FFFFFF', fontSize: 12}}>
                                {item?.label}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SocialBenefits;