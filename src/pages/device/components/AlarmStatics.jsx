import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { useSelector, useIntl } from "umi";
import { getAlarmStatics as getAlarmStaticsServe } from "@/services";
import { alarmLevel } from "@/utils/constants";

const AlarmStatics = ({ plantId }) => {
    const intl = useIntl();
    const { theme, locale } = useSelector(state => state.global);
    const [options, setOptions] = useState({});
    const [data, setData] = useState([]);

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
                            const label = alarmLevel.find(levelItem => levelItem.value==item)?.key;
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
        const res = await getAlarmStaticsServe({plantId});
        if(res?.data?.code==="ok"){
            setData(res?.data?.data);
        }
    }

    useEffect(() => {
        getOptions(data);
    }, [data, locale, theme]);

    useEffect(() => {
        if(plantId) getData();
    }, [plantId])

    return (
        <ReactECharts
            option={options}
            style={{ width: '100%', height: "100%" }}
            notMerge
        />
    );
};

export default AlarmStatics;
