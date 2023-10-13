import { Title } from "@/components";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const statusEnum = {
    'Created': '已创建'
}

const DemandCard = ({
    dataSource
}) => {
    const { token } = theme.useToken();

    const card = useEmotionCss(({token})=>{
        return {
            display: 'grid',
            gap: 20,
            "@media screen and (min-width: 2000px)": {
                gridTemplateColumns: 'repeat(6, 1fr)',
            },
            "@media screen and (min-width: 1000px) and (max-width: 2000px)": {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
            "@media screen and (min-width: 479px) and (max-width: 1000px)": {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            "@media screen and (max-width: 479px)": {
                gridTemplateColumns: 'repeat(1, 1fr)',
            }
        }
    })

    const cardItemStyle = useEmotionCss(({token})=>{
        return {
            background: 'white',
            padding: '20px',
            borderRadius: token.borderRadiusLG,
            border: `1px solid ${token.colorBorder}`,
            '.cardItemRowStyle': {
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '10px',
                '&:nth-last-child(1)': {
                    marginBottom: 0
                },
            },
            '.cardItemRowTitleStyle': {
                color: '#969696'
            },
            '.cardItemRowDataStyle': {
                fontWeight: 600
            },
            '&:hover': {
                border: `1px solid ${token.colorPrimary}`,
            }
        }
    });

    return (
        <div 
            style={{
                padding: '15px 0',
                borderRadius: '8px'
            }}
        >
            <div className={card}>
                {
                    dataSource?.map(data => {
                        return (
                            <div className={cardItemStyle}>
                                <div className={'cardItemRowStyle'}>
                                    <div>{data?.time}</div>
                                    <div 
                                        style={{
                                            padding: '3px 10px',
                                            border: `1px solid ${data?.isDeclaration?token.colorPrimary:'#58CC60'}`,
                                            borderRadius: '5px',
                                            color: `${data?.isDeclaration?token.colorPrimary:'#58CC60'}`,
                                            fontSize: '10px'
                                        }}
                                    >
                                        {statusEnum[data?.status]}
                                    </div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>{data?.declarationType}</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.declarationCount}MWh</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>市场</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.market}</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>相应区域</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.area}</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>邀约编号</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.invitationCode}</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>限价</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.price}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DemandCard;