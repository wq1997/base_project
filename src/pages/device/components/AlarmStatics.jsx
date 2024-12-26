import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { useSelector, useIntl } from "umi";
import { getAlarmStatics as getAlarmStaticsServe } from "@/services";
import { alarmLevel } from "@/utils/constants";
import { Empty } from "antd";

const AlarmStatics = ({ plantId }) => {
    const intl = useIntl();
    const { theme, locale } = useSelector(state => state.global);
    const [options, setOptions] = useState({});
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const labelColor = theme == "dark" ? "#fff" : "#000";
    const getOptions = data => {
        setOptions({
            tooltip: {
                trigger: "item",
            },
            legend: {
                bottom: "0%",
                left: "center",
                textStyle: {
                    color: labelColor,
                },
            },
            series: [
                {
                    type: "pie",
                    radius: ["40%", "70%"],
                    center: ["50%", "42%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: "center",
                    },
                    labelLine: {
                        show: false,
                    },
                    color: ["#FD7068", "#FFA47B", "#FFEF72", "#34FFFD"],
                    data: data
                        ? Object?.keys(data || {})?.map(item => {
                            const label = alarmLevel.find(levelItem => levelItem.value == item)?.key;
                            return {
                                name: intl.formatMessage({ id: label }),
                                value: data?.[item] || "",
                            };
                        })
                        : [],
                },
            ],
        });
    };

    const getData = async () => {
        const res = await getAlarmStaticsServe({ plantId });
        if (res?.data?.code === "ok") {
            const data = res?.data?.data;
            let count = 0
            Object.keys(data)?.forEach(item => {
                count = data[item] + count;
            })
            setIsEmpty(count === 0)
            setData(data);
        }
    }

    useEffect(() => {
        getOptions(data);
    }, [data, locale, theme]);

    useEffect(() => {
        if (plantId) getData();
    }, [plantId])
    
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {
                isEmpty?
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Empty 
                        description={intl.formatMessage({id: '暂无告警'})}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
                :
                <ReactECharts
                    option={options}
                    style={{ width: '100%', height: "100%" }}
                    notMerge
                />
            }
        </div>
    );
};

export default AlarmStatics;
