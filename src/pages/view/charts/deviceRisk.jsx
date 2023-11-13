import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const DeviceRisk = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const cluster = [
            '第一簇', '第二簇', '第三簇', '第四簇', '第五簇', '第六簇'
        ];
        // prettier-ignore
        const pack = [
            'Pack 1', 'Pack 2', 'Pack 3',
            'Pack 4', 'Pack 5', 'Pack 6', 'Pack 7'
        ];
    
        // prettier-ignore
        const data = [[0, 0, 1], [0, 1, 1], [3, 2, 5], [5, 3, 10]]
         .map(function (item) {
         return [item[1], item[0], item[2] || '-'];
        });
        setOptions({
            tooltip: {
              position: "top",
              formatter: function (params) {
                return (
                  "簇：" +
                  cluster[params.value[1]] +
                  "<br/>包：" +
                  pack[params.value[0]] +
                  "<br/>风险值：" +
                  params.value[2]
                );
              },
            },
            grid: {
              height: "50%",
              top: "10%",
            },
            xAxis: {
              type: "category",
              data: cluster,
              splitArea: {
                show: true,
              },
              axisLabel: {
                textStyle: { color: "rgba(255,255,255,.6)", fontSize: "12" },
              },
            },
            yAxis: {
              type: "category",
              data: pack,
              splitArea: {
                show: true,
              },
              axisLabel: {
                textStyle: { color: "rgba(255,255,255,.6)", fontSize: "10" },
              },
            },
            visualMap: {
              min: 0,
              max: 10,
              calculable: true,
              orient: "horizontal",
              left: "center",
              bottom: "15%",
              textStyle: {
                color: "rgba(255,255,255,.6)", // 设置了文字颜色为黑色
                fontSize: 16, // 设置了文字大小为16像素
              },
            },
            series: [
              {
                name: "风险等级",
                type: "heatmap",
                data: data,
                label: {
                  show: true,
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowColor: "rgba(255,255,255,.6)",
                  },
                },
              },
            ],
          });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: "100%"}} />;
};

export default DeviceRisk;