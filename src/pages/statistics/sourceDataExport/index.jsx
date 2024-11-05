// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {theme, Select, DatePicker, Button, Cascader, message, Space, Radio, Checkbox, Table,Popover} from "antd";
import classNames from 'classnames';

const {RangePicker} = DatePicker;
import styles from './index.less'
import {CardModel} from "@/components";
import {
    getDataExportPageInitVo,
    getBigDataParamsByDevType,
    getExportData
} from '@/services/report'
import {getDataParams} from '@/services/deviceTotal';
import dayjs from 'dayjs';
import {getQueryString, downLoadExcelMode} from "@/utils/utils";
import {useIntl} from "umi";

const {SHOW_CHILD} = Cascader;

function Com(props) {
    const {token} = theme.useToken();
    const id = getQueryString('id') || 0;
    const [dateStart, setDateStart] = useState(dayjs(new Date()).subtract(6, 'day'));
    const [dateEnd, setDateEnd] = useState(dayjs(new Date()));
    const [dateStartStr, setDateStartStr] = useState(dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'));
    const [dateEndStr, setDateEndStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [radioTimeValue, setRadioTimeValue] = useState("");
    const [radioDevTypeValue, setRadioDevTypeValue] = useState("");
    const [timeOptions, setTimeOptions] = useState([]);
    const [devTypeOptions, setDevTypeOptions] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [devAllOptions, setDevAllOptions] = useState([]);
    const CheckboxGroup = Checkbox.Group;
    const [devNameList, setDevNameList] = useState([]);
    const [devDataList, setDevDataList] = useState([]);
    const devAllCheck = {
        checkDevNameAll: devAllOptions[radioDevTypeValue]?.devName?.length === devNameList.length,
        devNameIndeterminate: devNameList.length > 0 && devNameList.length < devAllOptions[radioDevTypeValue]?.devName?.length,

        checkDevDataAll: devAllOptions[radioDevTypeValue]?.dataLabel?.length === devDataList.length,
        devDataIndeterminate: devDataList.length > 0 && devDataList.length < devAllOptions[radioDevTypeValue]?.dataLabel?.length,
    }
    const [columns, setColumns] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [dataSource, setDataSource] = useState([]);
    const isDarkTheme = token.colorBgContainer != '#FFFFFF';
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getInitData();
        setCol();
    }, [token, id]);

    const defaultCol = [
        {
            title: t('日期'),
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: true,
        },
        {
            title: t('设备名称'),
            width: 120,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            sorter: true,
        },
        {
            title: t('数据项'),
            dataIndex: 'address',
            key: '1',
            width: 150,
            fixed: 'left',
            sorter: true,
        },
    ];

    const getInitData = async () => {
        let {data} = await getDataExportPageInitVo({plantId: localStorage.getItem('plantId')});

        if (data?.code === 200) {
            let {deviceType2Devices, timeLongs} = data.data;
            setTimeOptions(timeLongs);
            setRadioTimeValue(timeLongs[0]?.code);

            const devTypeArr = [];
            const devAllOptObj = {};
            const promises = [];

            for (let key in deviceType2Devices) {
                const deviceType = deviceType2Devices[key][0]?.type;
                devTypeArr.push({value: deviceType, label: key});

                if (!devAllOptObj[deviceType]) {
                    devAllOptObj[deviceType] = {
                        devName: [],
                        dataLabel: []
                    };
                }

                const promise = getBigDataParamsByDevType({type: deviceType})
                    .then(res => {
                        res?.data?.data?.forEach(item => {
                            devAllOptObj[deviceType].dataLabel.push({
                                label: item.dataTypeDesc,
                                value: item.dataType,
                                id: item.id,
                                deviceType: item.deviceType,
                                devType: item.devType,
                            });
                        });
                    });
                promises.push(promise);
            }

            await Promise.all(promises);

            for (let key in deviceType2Devices) {
                const deviceType = deviceType2Devices[key][0]?.type;

                deviceType2Devices[key]?.forEach(item => {
                    devAllOptObj[deviceType]?.devName.push({
                        label: item.name,
                        value: item.id,
                        type: item.type,
                        associateId: item.associateId,
                        containerId: item.containerId,
                        gridPoint: item.gridPoint,
                        dtuId: item.dtuId,
                    });
                });
            }

            setDevTypeOptions(devTypeArr);
            setRadioDevTypeValue(devTypeArr[0]?.value);
            setDevAllOptions(devAllOptObj);
        }
    };

    const onCheckBoxChange = (list, flag) => {
        if (flag == 1) {
            setDevNameList(list);
        } else {
            setDevDataList(list);
        }

    };
    const onCheckAllChange = (e, flag) => {
        let arr = [];
        if (flag == 1) {
            devAllOptions[radioDevTypeValue]?.devName?.forEach(item => {
                arr.push(item?.value);
            })
            setDevNameList(e.target.checked ? arr : []);
        } else {
            devAllOptions[radioDevTypeValue]?.dataLabel?.forEach(item => {
                arr.push(item?.value);
            })
            setDevDataList(e.target.checked ? arr : []);
        }
    };

    const onRadioChange = (e, flag) => {
        if (flag == 1) {
            setRadioTimeValue(e.target.value);
        } else {
            setRadioDevTypeValue(e.target.value);
            devAllCheck.checkDevNameAll = false;
            devAllCheck.devNameIndeterminate = false;
            devAllCheck.checkDevDataAll = false;
            devAllCheck.devDataIndeterminate = false;
            setDevNameList([]);
            setDevDataList([]);
        }
    };

    const changeDate = (val, str) => {
        setDateStart(val?.[0]);
        setDateEnd(val?.[1]);
        setDateStartStr(str?.[0]);
        setDateEndStr(str?.[1]);
    }

    const downloadExcel = () => {
        let fileName = t('源数据导出');
        let sheetFilter = [];
        let sheetHeader = [];
        let sheetData = dataSource;
        let sheetName = `${dateStartStr} ${t("至")} ${dateEndStr}`;
        columns.forEach((item, index) => {
            sheetHeader.push(item.title);
            sheetFilter.push(item.dataIndex)
        })
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName);
    }
    const getQueryParam = () => {
        let arr = [];
        devNameList?.forEach(devName => {
            devDataList?.forEach(devData => {
                arr.push({
                    devId: devName,
                    dataId: devData,
                });
            });
        });
        return {
            startDate: dateStartStr,
            endDate: dateEndStr,
            timeLong: radioTimeValue,
            dataParams: arr,
        };
    };
    const handleTableChange = (pagination, filters, sorter, extra) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        });
        // console.log("pagination:", pagination)
        // console.log("sorter:", sorter)
        // console.log("tableParams:", tableParams)
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        //     setDataSource([]);
        // }
    };
    const setCol = () => {
        const generateTimeArray = (interval) => {
            const newArr = [];
            let currentTime = 0; // 当前时间，以分钟为单位

            while (currentTime <= 1440) { // 1440分钟 = 24小时
                const hours = String(Math.floor(currentTime / 60)).padStart(2, '0'); // 计算小时
                const minutes = String(currentTime % 60).padStart(2, '0'); // 计算分钟
                newArr.push({
                    title: `${hours}:${minutes}`,
                    dataIndex: 'address',
                    key: `${hours}:${minutes}`,
                    width: 150,
                });
                currentTime += interval; // 增加间隔
            }

            return newArr;
        };

        const interval = parseInt(5, 10);
        const timeCol = generateTimeArray(interval);
        setColumns(prevColumns => [...defaultCol, ...timeCol]);
    }
    const extractTime = (timeString) => {
        const parts = timeString.split(' ');
        return parts[1].substring(0, 5);
    }
    const getTableData = async () => {
        const differenceInDays = dateEnd.diff(dateStart, 'day');
        if (differenceInDays > 6) {
            message.error(t("日期范围不能超过7天"));
            return;
        }
        if (devNameList?.length <= 0) {
            message.error(`${t("请选择")} ${t("设备名称")}`);
            return;
        }
        if (devDataList?.length <= 0) {
            message.error(`${t("请选择")} ${t("数据项")}`);
            return;
        }
        setTableLoading(true);
        const arr = devNameList.flatMap(devName =>
            devDataList.map(devData => ({
                devId: devName,
                dataId: devData,
            }))
        );

        const param = {
            startDate: dateStartStr,
            endDate: dateEndStr,
            timeLong: radioTimeValue,
            dataParams: arr,
        };

        let res = await getExportData(param);
        let newTableCol = [];
        let newTableArr = [];
        const headers = res?.data?.data?.headers || [];
        const records = res?.data?.data?.records || [];

        const timeKeys = records[0]?.timeValues?.map((twoItem, index) =>
            extractTime(dayjs(twoItem.time).format('YYYY-MM-DD HH:mm:ss'))
        );

        headers.forEach((item, index) => {
            if (index === 0) {
                newTableCol.push({
                    title: item,
                    width: 150,
                    dataIndex: 'date',
                    key: 'date',
                    fixed: 'left',
                    // sorter: true,
                    sorter: (a, b) => new Date(a.date) - new Date(b.date),
                });
            } else if (index === 1) {
                newTableCol.push({
                    title: item,
                    width: 110,
                    dataIndex: 'deviceName',
                    key: 'deviceName',
                    fixed: 'left',
                    sorter: (a, b) => a.deviceName.length - b.deviceName.length,
                });
            } else if (index === 2) {
                newTableCol.push({
                    title: item,
                    width: 250,
                    dataIndex: 'dataName',
                    key: 'dataName',
                    fixed: 'left',
                    sorter: (a, b) => a.dataName.length - b.dataName.length,
                });
            } else {
                newTableCol.push({
                    title: item,
                    width: 100,
                    dataIndex: timeKeys[index - 3],
                    key: timeKeys[index - 3],
                });
            }
        });

        records.forEach(oneItem => {
            const timeArr = {};
            oneItem?.timeValues?.forEach(twoItem => {
                const time = extractTime(dayjs(twoItem.time).format('YYYY-MM-DD HH:mm:ss'));
                timeArr[time] = twoItem.value;
            });
            newTableArr.push({
                date: oneItem.date,
                deviceName: oneItem.deviceName,
                dataName: oneItem.dataName,
                ...timeArr
            });
        });

        setColumns(newTableCol);
        setDataSource(newTableArr);
        setTableLoading(false);
    };
    const content = (
        <p>{t("日期范围不能超过7天")}</p>
    );
    return (
        <div style={{height: '100%', width: '100%', paddingBottom: '10px'}}>
            <CardModel
                title={t('源数据导出')}
                content={
                    <div style={{color: token.titleColor}} className={classNames(styles.advancedAnalytics, {
                        [styles.darkTheme]: isDarkTheme,
                    })}>
                        <div className={styles.searchHead}>
                            <span>{t('查询日期')}:</span>
                            <Space direction="vertical" size={12}>
                                <Popover content={content}>
                                    <RangePicker onChange={(val, str) => changeDate(val, str)}
                                                 defaultValue={[dateStart, dateEnd]}/>
                                </Popover>
                            </Space>
                            <Button type="primary" className={styles.firstButton}
                                    onClick={getTableData}>{t('查询')}</Button>
                            <Button type="primary" style={{backgroundColor: token.defaultBg}}
                                    onClick={downloadExcel}>{t('导出')}{" "}Excel</Button>
                        </div>
                        <div className={styles.searchHead}>
                            <span>{t('时间间隔')}:</span>
                            <Radio.Group onChange={(e) => onRadioChange(e, 1)} value={radioTimeValue}>
                                {
                                    timeOptions?.map(item => {
                                        return (
                                            <Radio value={item.code}>{item.name}</Radio>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className={styles.searchHead}>
                            <span>{t('设备类型')}:</span>
                            <Radio.Group onChange={(e) => onRadioChange(e, 2)} value={radioDevTypeValue}>
                                {devTypeOptions?.map(item => {
                                    return (
                                        <Radio value={item.value}>{item.label}</Radio>
                                    )
                                })}
                            </Radio.Group>
                        </div>
                        <div className={styles.searchHead}>
                            <span>{t('设备名称')}:</span>
                            {
                                devAllOptions[radioDevTypeValue]
                                &&
                                <span>
                                    <div>
                                      <Checkbox indeterminate={devAllCheck.devNameIndeterminate}
                                                onChange={e => {
                                                    onCheckAllChange(e, 1)
                                                }}
                                                checked={devAllCheck.checkDevNameAll}>{t("全选")}</Checkbox>
                                    </div>
                                    <div>
                                      <CheckboxGroup options={devAllOptions[radioDevTypeValue].devName}
                                                     value={devNameList} onChange={list => {
                                          onCheckBoxChange(list, 1)
                                      }}/>
                                    </div>
                                </span>
                            }

                        </div>
                        <div className={styles.searchHead}>
                            <span>{t('数据项')}:</span>
                            {
                                devAllOptions[radioDevTypeValue]
                                &&
                                <span>
                                    <div>
                                      <Checkbox indeterminate={devAllCheck.devDataIndeterminate}
                                                onChange={e => {
                                                    onCheckAllChange(e, 2)
                                                }}
                                                checked={devAllCheck.checkDevDataAll}>{t("全选")}</Checkbox>
                                    </div>
                                    <div>
                                      <CheckboxGroup options={devAllOptions[radioDevTypeValue]?.dataLabel}
                                                     value={devDataList} onChange={list => {
                                          onCheckBoxChange(list, 2)
                                      }}/>
                                    </div>
                                </span>
                            }

                        </div>
                        <div></div>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            loading={tableLoading}
                            scroll={{
                                x: 'max-content',
                                y: 55 * 5,
                            }}
                            pagination={tableParams.pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                }

            />
        </div>

    )
}

export default Com