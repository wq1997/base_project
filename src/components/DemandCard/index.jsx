import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme, Avatar, Dropdown } from "antd";
import useIcon from "@/hooks/useIcon";

const DemandCard = ({
    dataSource
}) => {
    const Icon = useIcon();
    const { token } = theme.useToken();

    const statusEnum = {
        'Created': '已创建',
        'Declared': '已发布',
        'Winning': '已中标',
        'Lose': '未中标'
    }
    
    const statusColor = {
        'Created': '#1677ff',
        'Declared': '#389e0d',
        'Winning': token.colorPrimary,
        'Lose': '#000'
    }

    const card = useEmotionCss(({token})=>{
        return {
            display: 'grid',
            gap: 20,
            "@media screen and (min-width: 2500px)": {
                gridTemplateColumns: 'repeat(5, 1fr)',
            },
            "@media screen and (min-width: 2000px) and (max-width: 2500px)": {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
            "@media screen and (min-width: 1500px) and (max-width: 2000px)": {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            "@media screen and (min-width: 1000px) and (max-width: 1500px)": {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            "@media screen and (max-width: 1000px)": {
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
                '.icon': {
                    color: token.colorPrimary,
                    fontSize: 18,
                    cursor: 'pointer'
                }
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
                    dataSource?.map((data, index) => {
                        return (
                            <div className={cardItemStyle} key={index}>
                                <div className={"cardItemRowStyle"}>
                                    <Avatar 
                                        style={{ 
                                            backgroundColor: token.colorPrimary, 
                                            width: 25,
                                            height: 25,
                                            lineHeight: '25px',
                                            opacity: 0.8
                                        }} 
                                        size="large" 
                                    >
                                        A
                                    </Avatar>
                                    <Dropdown 
                                        menu={{ items: [
                                            {
                                                key: '1',
                                                label:(
                                                    <a>发布</a>
                                                )   
                                            },
                                            {
                                                key: '2',
                                                label:(
                                                    <a>审核</a>
                                                )   
                                            },
                                            {
                                                key: '3',
                                                label:(
                                                    <a>编辑</a>
                                                )   
                                            },
                                            {
                                                key: '4',
                                                label:(
                                                    <a>删除</a>
                                                )   
                                            },
                                        ] }} 
                                        placement="bottom"
                                    >
                                        <Icon 
                                            type="icon-caozuo"
                                            className="icon"
                                        />
                                    </Dropdown>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div>{data?.time}</div>
                                    <div 
                                        style={{
                                            padding: '3px 10px',
                                            border: `1px solid ${statusColor[data?.status]}`,
                                            borderRadius: '5px',
                                            color: `${statusColor[data?.status]}`,
                                            fontSize: '10px'
                                        }}
                                    >
                                        {statusEnum[data?.status]}
                                    </div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>{data?.demandType}</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.demandCount}KW</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>响应价格</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.price}(元/KWh)</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>响应运行商</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.creator}</div>
                                </div>
                                <div className={'cardItemRowStyle'}>
                                    <div className={'cardItemRowTitleStyle'}>响应编号</div>
                                    <div className={'cardItemRowDataStyle'}>{data?.demandCode}</div>
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