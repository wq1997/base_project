import { Space, Button, Table, theme, DatePicker, Row } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./index.less";

const Detailed = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [name, setName] = useState();
    const nameRef = useRef();
    const [projectName, setProjectName] = useState();
    const projectNameRef = useRef();
    const [orderType, setOrderType] = useState();
    const orderTypeRef = useRef();
    const [exceptionType, setExceptionType] = useState();
    const exceptionTypeRef = useRef();
    const [ownExceptionType, setOwnExceptionType] = useState();
    const ownExceptionTypeRef = useState();
    const [manufacturer, setManufacturer] = useState();
    const manufacturerRef = useRef();
    const [handlerPerson, setHandlerPerson] = useState();
    const handlerPersonRef = useRef();
    const [handlerResult, setHandlerResult] = useState();
    const handlerResultRef = useRef();
    const [files, setFiles] = useState();
    const filesRef = useState();
    const [dataSource, setDataSource] = useState([{}]);

    const getOptions = () => {
        const options = {
            color: ["#00FFF8", "#8FC0FF"],
            tooltip: {
                trigger: "item",
            },
            legend: {
                show: false
            },
            series: [
                {
                    type: "pie",
                    radius: ["50%", "70%"],
                    selectedMode: "single",
                    data: [
                        { value: 1285, name: "维保项目" },
                        { value: 85, name: "实施项目" },
                    ],
                    label: {
                        normal: {
                            textStyle: {
                                color: "#fff",
                            },
                            formatter: "{b}{c|{c}}\n{d|{d}%}",
                            rich: {
                                b: {
                                    color: "#12EABE",
                                    align: "left",
                                    padding: 4,
                                },
                                d: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                                c: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                            },
                        },
                    },
                },
            ],
        };
        return options;
    };

    return (
        <div className={styles.detailed}>
            <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 28 }}>查询条件</div>
            <Space className={styles.search} size={20}>
                <div>
                    <span style={{ color: "#FFF" }}>异常生成时间：</span>
                    <DatePicker />
                </div>
                <div>
                    <span style={{ color: "#FFF" }}>异常完结时间：</span>
                    <DatePicker />
                </div>
                <SearchInput
                    label="异常名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="关联项目名称"
                    value={projectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                />
                <SearchInput
                    label="关联工单类型"
                    value={orderType}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        orderTypeRef.current = value;
                        setOrderType(value);
                    }}
                />
                <SearchInput
                    label="异常所属类型"
                    value={exceptionType}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        exceptionTypeRef.current = value;
                        setExceptionType(value);
                    }}
                />
                <SearchInput
                    label="异常类型"
                    value={ownExceptionType}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        ownExceptionTypeRef.current = value;
                        setOwnExceptionType(value);
                    }}
                />
                <SearchInput
                    label="责任厂商"
                    value={manufacturer}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        manufacturerRef.current = value;
                        setManufacturer(value);
                    }}
                />
                <SearchInput
                    label="异常处理人"
                    value={handlerPerson}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        handlerPersonRef.current = value;
                        setHandlerPerson(value);
                    }}
                />
                <SearchInput
                    label="异常处理结果"
                    value={handlerResult}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        handlerResultRef.current = value;
                        setHandlerResult(value);
                    }}
                />
                <SearchInput
                    label="异常上传附件"
                    value={files}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        filesRef.current = value;
                        setFiles(value);
                    }}
                />
                <Button type="primary">搜索</Button>
                <Button type="primary" danger>重置</Button>
            </Space>
            <div className={styles.center}>
                <Row justify="space-between" style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 20, color: token.fontColor }}>异常统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor }}>异常总数：21</div>
                </Row>
                <Row justify="space-between">
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                </Row>
                <Row justify="space-around">
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>所属类型统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>异常类型统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>厂商类型统计</div>
                </Row>
            </div>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={[
                    {
                        title: "异常生成时间",
                        dataIndex: "name",
                    },
                    {
                        title: "异常完结时间",
                        dataIndex: "name1",
                    },
                    {
                        title: "异常名称",
                        dataIndex: "name2",
                    },
                    {
                        title: "关联项目名称",
                        dataIndex: "name3",
                    },
                    {
                        title: "关联工单类型",
                        dataIndex: "name4",
                    },
                    {
                        title: "异常所属类型",
                        dataIndex: "name5",
                    },
                    {
                        title: "异常类型",
                        dataIndex: "name6",
                    },
                    {
                        title: "责任厂商",
                        dataIndex: "name7",
                    },
                    {
                        title: "异常处理人",
                        dataIndex: "name8",
                    },
                    {
                        title: "异常处理结果",
                        dataIndex: "name9",
                    },
                    {
                        title: "处理附件",
                        dataIndex: "name11",
                    },
                    {
                        title: "操作",
                        dataIndex: "Action",
                        render: (_, row) => {
                            return (
                                <Space>
                                    <Button type="link">
                                        去处理
                                    </Button>
                                    <Button type="link" style={{ color: token.colorPrimary }}>
                                        详情
                                    </Button>
                                </Space>
                            );
                        },
                    },
                ]}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                }}
            />
        </div>
    )
}

export default Detailed;