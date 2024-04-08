import { theme as antdTheme, Card } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useState, useEffect } from "react";
import { Title, StaticsCard, ScrollTable } from "@/components";
import { useSelector } from "umi";
import {
    getCompanyDashboardSummery as getCompanyDashboardSummeryServe
} from "@/services";
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
    const [dataSource, setDataSource] = useState({});
    const colorList = [
        token.color29,
        token.color30,
        token.color31,
        token.color32,
        token.color33,
        token.color34,
        token.color35,
        token.color36,
        token.color37
    ]

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
            },
            ".bottom": {
                height: 200,
                display: 'flex',
                '.left': {
                    width: 'calc(45% - 5px)',
                },
                '.right': {
                    width: 'calc(55% - 5px)',
                },
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
                    img: resourceImg,
                    darkImg: resourceDarkImg
                },
                {
                    label: "签约容量(KW)",
                    value: 0,
                    img: resourceImg,
                    darkImg: resourceDarkImg
                },
                {
                    label: "最大可调负荷(KW)",
                    value: 0,
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
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg
                },
                {
                    label: "本年收益(元)",
                    value: 0,
                    img: responseIncomeImg,
                    darkImg: responseIncomeDarkImg
                },
                {
                    label: "次年预计收益(元)",
                    value: 0,
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
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                },
                {
                    label: "完成总数",
                    value: 0,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                },
                {
                    label: "有效响应功率(KW)",
                    value: 0,
                    img: responseExecuteImg,
                    darkImg: responseExecuteDarkImg
                }
            ],
        },
    });

    const getData = async () => {
        const res = await getCompanyDashboardSummeryServe();
        if(res?.data?.data){
            const cloneData = JSON.parse(JSON.stringify(data));
            const result = res?.data?.data;
            console.log(result);
            setDataSource(result);
            cloneData.resource.dataSource[0].value = result.deviceCount;
            cloneData.resource.dataSource[1].value = result.maxLoad;
            cloneData.resource.dataSource[2].value = result.maxAdjustableLoad;

            cloneData.responseIncome.dataSource[0].value = result.profitSummary;
            cloneData.responseIncome.dataSource[1].value = result.currentYearProfit;
            cloneData.responseIncome.dataSource[2].value = result.followingYearProjectedProfit;

            cloneData.responseExecute.dataSource[0].value = result.receiveTaskCount;
            cloneData.responseExecute.dataSource[1].value = result.executeSuccessTaskCount;
            cloneData.responseExecute.dataSource[2].value = result.effectiveResponsePower;

            setData(cloneData);
        }
    }

    useEffect(()=>{
        getData();
    }, [])

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
                                                color={colorList.shift()}
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
                        <LoadStatisc dataSource={dataSource?.timeSharingLoad?.loads||[]} />
                    </div>
                </div>
            </div>
            <div className={"bottom"}>
                <div className="left">
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>
                        公司评级
                    </Title>
                </div>
                <div className="right">
                    <Title style={{ marginTop: 0, marginBottom: 20 }}>
                        用户响应统计
                    </Title>
                    <div
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <ScrollTable
                            columns={[
                                {
                                    title: "响应类型",
                                    key: 'type',
                                },
                                {
                                    title: "日前响应(kW)",
                                    key: 'dayBefore',
                                },
                                {
                                    title: "日中响应(kW)",
                                    key: 'dayIn',
                                },
                                {
                                    title: "实时响应(kW)",
                                    key: 'realTime',
                                }
                            ]}
                            dataSource={[
                                {
                                    type: '削峰',
                                    dayBefore: dataSource?.companyResponseSummery?.heightPeakCut?.dayBefore,
                                    dayIn: dataSource?.companyResponseSummery?.heightPeakCut?.dayIn,
                                    realTime: dataSource?.companyResponseSummery?.heightPeakCut?.realTime,
                                },
                                {
                                    type: '填谷',
                                    dayBefore: dataSource?.companyResponseSummery?.lowPeakCut?.dayBefore,
                                    dayIn: dataSource?.companyResponseSummery?.lowPeakCut?.dayIn,
                                    realTime: dataSource?.companyResponseSummery?.lowPeakCut?.realTime,
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;