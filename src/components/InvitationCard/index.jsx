import { Title } from "@/components";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme } from "antd";

const InvitationCard = ({
    dataSource
}) => {
    const { token } = theme.useToken();

    const cardItemStyle = useEmotionCss(({token})=>{
        return {
            marginRight: 20,
            width: 300,
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid transparent`,
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
            <Title.PageSubTitle title={"邀约列表"} style={{marginBottom: '10px'}} />
            <div
                style={{
                    display: 'flex'
                }}
            >
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
                                        {data?.isDeclaration?"已申报":"待申报"}
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

export default InvitationCard;