import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect,useState  } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

const Confirm = () => {
    const getTasks = async () => {
        const res = await getWaitConfirmTasksServer();
        if (res?.data?.status == "SUCCESS") {
        }
    };

    const [options, setOptions] = useState({});

    const [myData, setMyData] = useState();
    const { data, run } = useRequest(getAllDtuEfficiencyServe, {
        pollingInterval: 1000*60*60*12, //12小时轮询一次
        manual: true,
    });
    
    const getOptions = () => {
        const data = myData?.map(item => item?.efficiency*100);
        const xData = myData?.map(item => item?.name?.length>5?item?.name?.slice(0,5)+'...':item?.name);
        setOptions({
            grid: {
                left: '10',
                right: '30',
                bottom: '-10',
                top: '10',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                    params[0].seriesName + ' : ' + Number(params[0].value).toLocaleString() + ' %<br/>'
                }
            },
            backgroundColor: 'rgb(20,28,52)',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
              {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12'
                    },
                    formatter: function(value) {
                        return `NO.${value}`
                    },
                },
                data: [1,2,3,4,5]
            },
            {
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: xData
            }],
            series: [{
                    name: '充放电效率',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#006888'
                            }, {
                                offset: 1,
                                color: '#00f58a'
                            }]),
                        },
                    },
                    barWidth: 10,
                    data
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    barGap: '-100%',
                    data: new Array(data?.length).fill(100),
                    itemStyle: {
                        normal: {
                            color: 'rgba(24,31,68,1)',
                            barBorderRadius: 10,
                        }
                    },
                },
            ]
        });
    };

    useEffect(()=>{
        run({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
    }, [deviceType, areaType]);

    useEffect(()=>{
        if(data?.data?.data){
            const result = data?.data?.data;
            const resultData = result?.splice(0,5);
            setMyData(resultData||[])
        }
    }, [data])

    useEffect(() => {
        getOptions();
    }, [myData]);


    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">待处理任务</div>
                <div className="content">
                    <div className="desc">
                        <div>
                            <div className="name">响应类型</div>
                            <div className="value">削峰</div>
                        </div>
                        <div>
                            <div className="name">任务功率（kW）</div>
                            <div className="value">35</div>
                        </div>
                        <div>
                            <div className="name">预计收益（元）</div>
                            <div className="value">2385</div>
                        </div>
                    </div>
                    <div className="time">
                        <div>响应时间：2023/12/31 15:00 - 2023/12/31 15:30</div>
                        <div>确认截止时间：2023/12/30 15:00</div>
                    </div>
                    <div className="btns">
                        <Button>查看详情</Button>
                        <Space>
                            <Button type="primary" danger>
                                拒绝
                            </Button>
                            <Button type="primary">确认响应</Button>
                        </Space>
                    </div>
                </div>
            </div>
            <div className="response-suggest">
                <div className="title">响应建议</div>
                <div className="content">
                    <div className="expected">
                        <div className="name">预计执行成功率</div>
                        <div className="percent">95%</div>
                        <div className="suggest">建议参与响应</div>
                    </div>
                    <div className="illustrate">
                        <div className="name">响应说明</div>
                        <div className="value">
                            响应成功率为根据响应能力及响应历史行为得出，高于60%建议确认响应
                        </div>
                    </div>
                </div>
            </div>
            <div className="curve">
            <div className="title">用电曲线</div>
                <div className="content">
                <ReactECharts option={options} style={{height: '100%'}} />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
