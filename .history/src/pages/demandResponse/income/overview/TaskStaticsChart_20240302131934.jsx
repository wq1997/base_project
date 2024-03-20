import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { Row, Divider, Space } from "antd";

const project = ["削峰", "填谷"];
const projectColor = ["#D97559", "#E4C477"];
const equipment = ["削峰-日前", "削峰-日中", "削峰-实时", "填谷-日前", "填谷-日中", "填谷-实时"];
const equipmentColor = ["#F39423", "#F9C78B", "#F5A544", "#FDECD8", "#F7B463", "#D5F2FF"];

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

const TaskStaticsChart = () => {
    const [projectData, setProjectData] = useState([1, 1]);
    const [equipmentData, setEquipmentData] = useState([1, 65, 10, 1, 115, 30]);
    const [options, setOptions] = useState({});

    const getOptions = () => {
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
                            value: projectData[0],
                            name: project[0],
                            itemStyle: { color: projectColor[0] },
                        },
                        {
                            value: projectData[1],
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
                            value: 1,
                            type: "削峰-日前",
                            name: "削峰-日前",
                            itemStyle: { color: equipmentColor[0] },
                        },
                        {
                            value: 1,
                            type: equipment[1],
                            name: "填谷-日前",
                            itemStyle: { color: equipmentColor[1] },
                        },
                    ],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <ReactECharts option={options} style={{ height: "100%", width: "50%" }} />
            <div style={{ marginTop: 30 }}>
                <Row>
                    <Space direction="vertical" size={20}>
                        <Lengend name={project[0]} data={projectData[0]} color={projectColor[0]} />
                        <Lengend
                            name={equipment[0]}
                            data={equipmentData[0]}
                            color={equipmentColor[0]}
                        />
                        {/* <Lengend name={equipment[1]} data={equipmentData[1]} color={equipmentColor[1]} />
                        <Lengend name={equipment[2]} data={equipmentData[2]} color={equipmentColor[2]} /> */}
                    </Space>
                    <Divider style={{ height: 150, margin: "0 30px" }} type="vertical" />
                    <Space direction="vertical" size={20}>
                        <Lengend name={project[1]} data={projectData[1]} color={projectColor[1]} />
                        <Lengend
                            name={equipment[3]}
                            data={equipmentData[3]}
                            color={equipmentColor[3]}
                        />
                        {/* <Lengend name={equipment[4]} data={equipmentData[4]} color={equipmentColor[4]} />
                        <Lengend name={equipment[5]} data={equipmentData[5]} color={equipmentColor[5]} />   */}
                    </Space>
                </Row>
            </div>
        </div>
    );
};

export default TaskStaticsChart;
