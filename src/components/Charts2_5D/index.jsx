import Highcharts from 'highcharts';
import { useEffect, useState, useRef } from 'react';
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

const Charts2_5D = ({size, depth, data, colors}) => {
    const ref = useRef(null);
    const pieSize = size;
    const initChart = () => {
        const parentWidth = ref?.current?.parentElement?.clientWidth;
        const parentHeight = ref?.current?.parentElement?.clientHeight;
        const size = parentWidth>parentHeight?parentHeight:parentWidth;

        Highcharts.chart("wq-2_5D", {
            chart: {
                height: size - 60,
                backgroundColor: "transparent",
                type: "pie",
                options3d: {
                    enabled: true,
                    alpha: 45,
                },
            },
            title: {
                text: "",
            },
            credits: { enabled: false },
            tooltip: {
                headerFormat: "",
                pointFormat:
                '<div style="font-size: 13px"><span style="color:{point.color}; font-weight:400">{point.name}</span><span style="font-weight:400">  {point.y}</span></div> ',
            },
            plotOptions: {
                pie: {
                    size: pieSize,
                    innerSize: 0,
                    depth,
                    cursor: "pointer",
                    colors: colors.map(color=>{
                        return {
                            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                            stops: [
                                [0, color[0]],
                                [1, color[1]]
                            ]
                        }
                    }),
                    dataLabels: {
                        enabled: false
                    }
                },
            },
            series: [
                {
                    data,
                },
            ],
        });
    }

    useEffect(()=>{
        initChart();
    }, [])
    return (
        <div ref={ref}>
            <div id="wq-2_5D"/>
            <div
                style={{
                    width: '100%',
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                {
                    data?.map((item, index) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div 
                                    style={{
                                        width: 20, 
                                        height: 10,
                                        background: `linear-gradient(90deg, ${colors[index][0]} 0%, ${colors[index][1]} 100%)`
                                    }} />
                                <div style={{color: 'white', marginLeft: 5}}>{item?.[0]}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Charts2_5D;