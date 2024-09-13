import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, message, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { jsonToUrlParams } from "@/utils/utils";
import dayjs from "dayjs";
import { getDeviceReportList as getDeviceReportListServer } from "@/services/report";
import { getDeviceType as getDeviceTypeServer } from "@/services/device";
import moment from "moment";
import { useSelector } from "umi";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const [deviceNameOptions, setDeviceNameOptions] = useState();
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const snRef = useRef();
    const [sn, setSn] = useState();
    const timeDimensionRef = useRef();
    const [timeDimension, setTimeDimension] = useState("DAY");
    const timeRef = useRef();
    const [time, setTime] = useState(moment(dayjs()).format("YYYY-MM-DD"));
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const { userInfo } = useSelector(state => state.user);

    const columns = [
        {
            title: "设备名称",
            dataIndex: "name",
        },
        {
            title: "关联电站",
            dataIndex: "plantName",
        },
        {
            title: "SN号",
            dataIndex: "",
        },
        {
            title: "设备类型",
            dataIndex: "typeZh",
        },
        {
            title: "发电量(kWh)",
            dataIndex: "power",
        },
        {
            title: "累计发电量(kWh)",
            dataIndex: "totalPower",
        },

        {
            title: "峰值交流功率(kW)",
            dataIndex: "peakPower",
        },
        {
            title: "平均温度(°C)",
            dataIndex: "averageTemperature",
        },
        {
            title: "系统效率PR(%)",
            dataIndex: "efficiency",
        },
    ];

    const getDeviceType = async () => {
        const res = await getDeviceTypeServer();
        if (res?.data?.code == 200) {
            setDeviceTypeOptions(res?.data?.data);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = deviceNameRef.current;
        const type = deviceTypeRef?.current;
        const sn = setSn?.current;
        if (!time) return message.info("请先选择日期");
        const code = deviceCodeRef?.current;
        const timePeriod = timeDimensionRef.current || timeDimension;
        const _time = timeRef.current || time;
        if (!_time) return message.info("请先选择日期");

        setLoading(true);
        const res = await getDeviceReportListServer({
            pageNo: current,
            pageSize,
            sn,
            name,
            type,
            time: _time,
            timePeriod,
        });
        if (res?.data?.code == 200) {
            const { total, records } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setDataSource(records);
        }
        setLoading(false);
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
        deviceNameRef.current = undefined;
        setDeviceName();
        deviceCodeRef.current = undefined;
        setDeviceCode();
        timeDimensionRef.current = undefined;
        setTimeDimension();
        timeRef.current = undefined;
        setTime();
        setDataSource();
        setPagination({
            current: 1,
            total: 0,
        });
    };

    useEffect(() => {
        getDeviceType();
        getList();
    }, []);

    return (
        <>
            <Space
                style={{
                    flexWrap: "wrap",
                }}
            >
                <SearchInput
                    label="设备名称"
                    placeholder="请选择设备"
                    type="select"
                    options={deviceNameOptions}
                    value={deviceName}
                    onChange={value => {
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />
                <SearchInput
                    label="设备类型"
                    value={deviceType}
                    type="select"
                    options={deviceTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <SearchInput
                    label="SN号"
                    placeholder="请输入SN号"
                    value={sn}
                    onChange={value => {
                        snRef.current = value;
                        setSn(value);
                    }}
                />
                <SearchInput
                    label="时间维度"
                    value={timeDimension}
                    allowClear={false}
                    type="select"
                    options={[
                        { displayName: "按日统计", name: "DAY" },
                        { displayName: "按月统计", name: "MONTH" },
                        { displayName: "按年统计", name: "YEAR" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        timeDimensionRef.current = value;
                        setTimeDimension(value);
                        timeRef.current = undefined;
                        setTime();
                    }}
                />
                <div>
                    <DatePicker
                        picker={
                            {
                                DAY: "day",
                                MONTH: "month",
                                YEAR: "year",
                            }[timeDimension]
                        }
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            timeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                        value={time ? dayjs(time) : null}
                    />
                </div>
                <Button type="primary" onClick={handleSearch}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>

            <Table
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                scroll={{
                    x: 1500,
                }}
                title={() => (
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                const name = deviceNameRef.current;
                                const type = deviceTypeRef?.current;
                                const timePeriod = timeDimensionRef.current || timeDimension;
                                const _time = timeRef.current || time;
                                if (!time) return message.info("请先选择日期");
                                let url = `${process.env.API_URL_1}/api/v1/report/export-device-report${jsonToUrlParams(
                                    {
                                        name,
                                        type,
                                        timePeriod,
                                        time: _time,
                                        userId: userInfo?.user?.id,
                                    }
                                )}`;
                                window.open(url);
                            }}
                        >
                            导出
                        </Button>
                    </div>
                )}
            />
        </>
    );
};

export default Log;
