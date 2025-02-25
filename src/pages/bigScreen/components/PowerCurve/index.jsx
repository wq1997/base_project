import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from "./index.less";
import { useSelector, useIntl } from "umi";
import { theme} from "antd"
import classNames from 'classnames';
import ReactECharts from "echarts-for-react";

function Com({ dataX, dataY ,legend}) {
    const { token } = theme.useToken();
    const global = useSelector(state => state.global);
    const [options, setOptions] = useState({});
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const getOptions = () => {
        setOptions({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:legend,
                right: '1%',
                textStyle: {
                    color:token.smallTitleColor,
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:dataX,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: global.theme=='dark'?'#333':'#ddd',
                    }
                },
                axisLabel: {
                    color: global.theme=='dark'?'#aaaaaa':'#333',
                },
                axisLine: {
                    lineStyle: {
                        color: global.theme == 'dark' ? '#333':'#ddd',
                    }
                },
            },
            yAxis: {
                type: 'value',
                name:`${t('功率')}(kW)`,
                nameTextStyle: {
                    color: token.smallTitleColor,
                },
                splitLine: {
                    lineStyle: {
                        color: global.theme=='dark'?'#333':'#ddd',
                    }
                },
                axisLabel: {
                    color: global.theme=='dark'?'#aaaaaa':'#333',
                },
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }],
            series: dataY
        });
    };



    useEffect(() => {
        getOptions();
    }, [token, dataX, dataY]);

    return (
        <ReactECharts option={options} style={{ height: 'calc(100% - 28px)' }} />
    )
}

export default Com