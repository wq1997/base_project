import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { Row, Divider, Space, Empty } from "antd";

const project = ["削峰", "填谷"];
const projectColor = ["#4AB9F3", "#7D7CF9"];
const equipment = ["削峰-日前", "削峰-日中", "削峰-实时", "填谷-日前", "填谷-日中", "填谷-实时"];
const equipmentColor = ["#7D7CF9", "#F9C78B", "#F5A544", "#4AB9F3", "#F7B463", "#D5F2FF"];

const Lengend = props => {
    const { name, data, color } = props;
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
                style={{
                    width: 30,
                    height: 10,
                    borderRadius: 5,
                    background: color,
                    marginRight: 10,
                }}
            />
            <div>
                {name}: {data}次
            </div>
        </div>
    );
};

const TaskStaticsChart = ({ dataSource }) => {
    const [projectData, setProjectData] = useState([0, 0]);
    const [equipmentData, setEquipmentData] = useState([0, 0, 0, 0, 0, 0]);
    const [options, setOptions] = useState({});

    const getOptions = () => {
        const newHeightPeakCutPower = dataSource?.responseType2TaskCount['削峰'];
        const newLowPeakCutPower = dataSource?.responseType2TaskCount['填谷'];
        let data1 = 0, data2 = 0;
        let type1 = 0, type2 = 0, type3 = 0, type4 = 0, type5 = 0, type6 = 0;
        if(newHeightPeakCutPower){
            type1 = newHeightPeakCutPower['削峰-日前'] || 0;
            type2 = newHeightPeakCutPower['削峰-日中'] || 0;
            type3 = newHeightPeakCutPower['削峰-实时'] || 0;
            data1 = type1 + type2 + type3;
        }

        if(newLowPeakCutPower){
            type4 = newHeightPeakCutPower['填谷-日前'] || 0;
            type5 = newHeightPeakCutPower['填谷-日中'] || 0;
            type6 = newHeightPeakCutPower['填谷-实时'] || 0;
            data2 = type4 + type5 + type6;
        }
        
        setProjectData([data1, data2]);
        setEquipmentData([type1, type2, type3, type4, type5, type6])
        setOptions({
            tooltip: {
                formatter: function (param) {
                    if (param.data.type == null) {
                        return param.data.name + ":" + param.value + "次";
                    } else {
                        return param.data.type + ":" + param.value + "次";
                    }
                },
            },

            series: [
                {
                    name: "整体分类",
                    type: "pie",
                    radius: ["35%", "60%"],
                    label: {
                        show: false,
                    },
                    selectedMode: "single",
                    data: [
                        {
                            value: data1,
                            name: project[0],
                            itemStyle: { color: projectColor[0] },
                        },
                        {
                            value: data2,
                            name: project[1],
                            itemStyle: { color: projectColor[1] },
                        },
                    ],
                },
                {
                    type: "pie",
                    radius: ["70%", "95%"],
                    label: {
                        show: false,
                    },
                    data: [
                        {
                            value: type1,
                            name: equipment[0],
                            itemStyle: { color: equipmentColor[0] },
                        },
                        {
                            value: type2,
                            name: equipment[1],
                            itemStyle: { color: equipmentColor[1] },
                        },
                        {
                            value: type3,
                            name: equipment[2],
                            itemStyle: { color: projectColor[2] },
                        },
                        {
                            value: type4,
                            name: equipment[3],
                            itemStyle: { color: projectColor[3] },
                        },
                        {
                            value: type5,
                            name: equipment[4],
                            itemStyle: { color: projectColor[4] },
                        },
                        {
                            value: type6,
                            name: equipment[5],
                            itemStyle: { color: projectColor[5] },
                        }
                    ],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, [dataSource]);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems:"center", justifyContent: 'center' }}>
            {
                (projectData?.[0]+projectData?.[1] > 0) ?
                <>
                  <ReactECharts option={options} style={{ height: "100%", width: "50%" }} />
                ` <div style={{ marginTop: 30 }}>
                        <Row>
                            <Space direction="vertical" size={20}>
                                <Lengend name={project[0]} data={projectData[0]} color={projectColor[0]} />
                                <Lengend
                                    name={equipment[0]}
                                    data={equipmentData[0]}
                                    color={equipmentColor[0]}
                                />
                                <Lengend name={equipment[1]} data={equipmentData[1]} color={equipmentColor[1]} />
                                <Lengend name={equipment[2]} data={equipmentData[2]} color={equipmentColor[2]} />
                            </Space>
                            {
                                projectData?.[1] > 0&&
                                <>
                                    <Divider style={{ height: 150, margin: "0 30px" }} type="vertical" />
                                    <Space direction="vertical" size={20}>
                                        <Lengend name={project[1]} data={projectData[1]} color={projectColor[1]} />
                                        <Lengend
                                            name={equipment[3]}
                                            data={equipmentData[3]}
                                            color={equipmentColor[3]}
                                        />
                                        <Lengend name={equipment[4]} data={equipmentData[4]} color={equipmentColor[4]} />
                                        <Lengend name={equipment[5]} data={equipmentData[5]} color={equipmentColor[5]} />  
                                    </Space>
                                </>
                            }
                        </Row>
                    </div>`
                </>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }
        </div>
    );
};

export default TaskStaticsChart;
