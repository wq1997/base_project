import React, {useState, useEffect, useMemo, useRef} from 'react';
import styles from "./index.less";
import {useSelector, useIntl} from "umi";
import {theme} from "antd"
import classNames from 'classnames';
import ReactECharts from "echarts-for-react";

function Com({data}) {
    const {token} = theme.useToken();
    const global = useSelector(state => state.global);
    const [options, setOptions] = useState({});
    const [newData, setNewData] = useState([]);
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
                trigger: 'item',
                position: function (point, params, dom, rect, size) {
                    var x = 0;
                    var y = 0;
                    var pointX = point[0];
                    var pointY = point[1];
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];
                    if (boxWidth > pointX) {
                        x = 5;
                    } else {
                        x = pointX - boxWidth;
                    }
                    if (boxHeight > pointY) {
                        y = 5;
                    } else {
                        y = pointY - boxHeight;
                    }
                    return [x, y];
                }
            },
            // color: global.theme == 'default' ? ['#ee6666', '#f59504', '#eae778', '#5470c6'] : ['#FF0000', '#FF6500', '#117878', '#02FF00'],
            series: [
                {
                    type: 'pie',
                    // bottom: '9%',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        });
    };


    useEffect(() => {
        getOptions();
        setNewData(data);
    }, [token, data]);

    return (
        <ReactECharts option={options} style={{height: '100%'}}/>
    )
}

export default Com