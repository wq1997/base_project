import ReactEcharts from "echarts-for-react";
import { addColorAlpha } from "@/utils/utils";
import "echarts-gl";

const Charts3D = ({
    colorList,
    data,
    autoRotate=true,
    showLengend=false
}) => {
     // 颜色列表
    colorList = colorList.map(color => addColorAlpha(color, 1),)

    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;
        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        // if (startRatio === 0 && endRatio === 1) {
        //     isSelected = false;
        // }
        isSelected = false;
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32,
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },

            x: function (u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y: function (u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1;
                }
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
            },
        };
    }

    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData?.length; i++) {
            sumValue += pieData[i].value;

            let seriesItem = {
                name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false,
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: 1 / 10,
                },
            };

            if (typeof pieData[i].itemStyle != 'undefined') {
                let itemStyle = {};

                typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
                typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series?.length; i++) {
            endValue = startValue + series[i].pieData.value;
            series[i].pieData?.startRatio = startValue / sumValue;
            series[i].pieData?.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData?.startRatio,
                series[i].pieData?.endRatio,
                false,
                false,
                k,
                series[i].pieData.value
            );
            startValue = endValue;
            legendData.push(series[i].name);
        }
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',

            parametric: true,
            wireframe: {
                show: false,
            },
            itemStyle: {
                opacity: 1,
                color: '#216595',
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                v: {
                    min: 0,
                    max: Math.PI / 4,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.5;
                },
                y: function (u, v) {
                    return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.5;
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? -3 : -3;
                },
            },
        });

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
            xAxis3D: {},
            yAxis3D: {},
            zAxis3D: {},
            tooltip: {
                formatter: params => {
                    if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
                        let bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) *
                            100).toFixed(2);
                        return `${params.seriesName}<br/>` +
                            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                            `${ bfb }%`;
                    }
                }
            },
            grid3D: {
                top: '-20%',
                viewControl: {
                    autoRotate, // 自动旋转
                },
                width: '100%',
                height: '100%',
                show: false,
                boxHeight: 45,
                // boxWidth和boxDepth这两个属性值保持一致，才可以在调整饼图宽度的时候保持水平，不然就会歪歪扭扭
                boxWidth: 215,
                boxDepth: 215,
            },
            series: series,
        };
        return option;
    }

    const serData = data?.map((dItem, index) => {
        return {
            ...dItem,
            value: Number(dItem.value),
            itemStyle: {
                color: colorList[index],
                borderWidth: 10
            },
        };
    });

    // 传入数据生成 option
    let option = getPie3D(serData, 0.7);

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '100%', flex: 1}}>
                <ReactEcharts
                    option={option}
                    style={{width: '100%', height: '100%'}}
                />
            </div>
            {
                showLengend&&data?.length<=4&&
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    {
                        data?.map((item, index) => {
                            return (
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{width: 10, height: 10, background: colorList[index], marginRight: 5}}/>
                                    <div style={{color: 'white'}}>{item?.name?.length>2?item?.name.slice(0,2)+'...':item?.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Charts3D;