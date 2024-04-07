import { theme as antdTheme, Card } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useState } from "react";
import { Title, StaticsCard } from "@/components";
import { useSelector } from "umi";
import resourceImg from "../../../../public/images/resource.svg";
import responseIncomeImg from "../../../../public/images/responseIncome.svg";
import responseExecuteImg from "../../../../public/images/responseExecute.svg";
import resourceDarkImg from "../../../../public/images/resourceDark.svg";
import responseIncomeDarkImg from "../../../../public/images/responseIncomeDark.svg";
import responseExecuteDarkImg from "../../../../public/images/responseExecuteDark.svg";
import userHomepageRightImg from "../../../../public/images/user_homepage_right.jpg";
import LoadStatisc from "./LoadStatisc";

const User = () => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);

    const mainStyle = useEmotionCss(()=>{
        return {
            width: '100%',
            minHeight: 'calc(100vh - 130px)',
            background: token.color28,
            padding: '25px 14px',
            boxSizing: 'border-box',
            '.top': {
                height: 550,
                display: 'flex',
                '.left': {
                    width: 'calc(45% - 5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '4px',
                    '.cardData': {
                        width: '100%',
                        height: '108px',
                        display: 'flex',
                        gap: '4px'
                    }
                },
                '.right': {
                    width: 'calc(55% - 5px)',
                    img: {
                        width: '100%',
                        height: 'calc(100% - 60px)',
                        objectFit: 'cover'
                    }
                },
            },
            ".center": {
                width: '100%',
                height: '400px',
                margin: '50px 0',
                ".centerLoadStatisc": {
                    height: "calc(100% - 40px)",
                }
            }
        }
    })

    const [data, setData] = useState({
        resource: {
            title: "资源分布统计",
            dataSource: [
                {
                    label: "设备资源",
                    value: 0,
                    color: token.color29,
                    img: resourceImg,
                    darkImg: resourceDarkImg
                },
                {
                    label: "签约容量(KW)",
                    value: 0,
                    color: token.color30,
                    img: resourceImg,
                    darkImg: resourceDarkImg
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 0,
                    color: token.color31,
                    img: resourceImg,
                    darkImg: resourceDarkImg
                },
            ],
        },
        responseIncome: {
            title: "响应收益统计",
            dataSource: [
                {
                    label: "累计收益(元)",
                    value: 0,
                    color: token.color32,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                    color: token.color33,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
                    color: token.color34,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg
                },
            ],
        },
        responseExecute: {
            title: "响应执行统计",
            dataSource: [
                {
                    label: "接收任务数",
                    value: 0,
                    color: token.color35,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                },
                {
                    label: "完成总数",
                    value: 0,
                    color: token.color36,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
                    color: token.color37,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                }
            ],
        },
    });

    return (
        <div className={mainStyle}>
            <div className="top">
                <div className="left">
                    {Object.keys(data)?.map(item => {
                        return (
                            <div style={{ flex: 1, height: "100%" }}>
                                <Title
                                    style={{ marginTop: 0, marginBottom: 20 }}
                                >
                                    {data[item].title}
                                </Title>
                                <div className="cardData">
                                    {data[item].dataSource?.map(dataSource => {
                                        return (
                                            <StaticsCard.SubStaticsCard
                                                image={theme==="dark"?dataSource.darkImg:dataSource.img}
                                                color={dataSource.color}
                                                label={dataSource.label}
                                                value={dataSource.value}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="right">
                    <Title
                        style={{ marginTop: 0, marginBottom: 20 }}
                    >
                        场站运行模拟
                    </Title>
                    <img src={userHomepageRightImg}/>
                </div>
            </div>
            <div className={"center"}>
                <div style={{ height: "100%", width: "100%" }}>
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>
                        分时负荷统计
                    </Title>
                    <div className={"centerLoadStatisc"}>
                        <LoadStatisc dataSource={[]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;