// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {theme, Select, DatePicker, Button, Cascader, message, Space, Radio, Checkbox,Table } from "antd";
const {RangePicker} = DatePicker;
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import {CardModel} from "@/components";
import {getDataComparisonInit, getCompareData} from '@/services/report'
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
    const [radioTimeValue, setRadioTimeValue] = useState("5");
    const [radioDevTypeValue, setRadioDevTypeValue] = useState(1);
    const [queryParam,setQueryParams] = useState({})
    const timeOptions = [
        {value: '5', label: '5', unit: 'min'},
        {value: '10', label: '10', unit: 'min'},
        {value: '15', label: '15', unit: 'min'},
        {value: '20', label: '20', unit: 'min'},
        {value: '25', label: '25', unit: 'min'},
        {value: '30', label: '30', unit: 'min'},
        {value: '35', label: '35', unit: 'min'},
        {value: '40', label: '40', unit: 'min'},
        {value: '45', label: '45', unit: 'min'},
        {value: '50', label: '50', unit: 'min'},
        {value: '55', label: '55', unit: 'min'},
        {value: '1', label: '1', unit: 'h'},
    ];
    const devTypeOptions = [
        {value: 1, label: 'PCS'},
        {value: 2, label: 'PCS Module'},
        {value: 3, label: 'BMS'},
        {value: 4, label: 'Metering meter'}
    ];
    const [tableLoading, setTableLoading] = useState(false);

    const devAllOptions = {
        "1": {
            devName: ['PCS1'],
            dataLabel:["PCS总有功功率","交流母线A相电流","交流母线B相电流","交流母线C相电流","交流母线AB相电压","交流母线BC相电压","交流母线CA相电压"],
            dataUnit:["kW","A","A","A","V","V","V"],
            dataItem: [
                {label: 'PCS总有功功率', unit: 'kW'},
                {label: '交流母线A相电流', unit: 'A'},
                {label: '交流母线B相电流', unit: 'A'},
                {label: '交流母线C相电流', unit: 'A'},
                {label: '交流母线AB相电压', unit: 'V'},
                {label: '交流母线BC相电压', unit: 'V'},
                {label: '交流母线CA相电压', unit: 'V'},
            ]
        },
        "2": {
            devName: ['PCS1_1', 'PCS1_2', 'PCS1_3'],
            dataLabel:["直流功率","直流电流","直流输入电压"],
            dataUnit:["kW","A","V"],
            dataItem: [
                {label: '直流功率', unit: 'kW'},
                {label: '直流电流', unit: 'A'},
                {label: '直流输入电压', unit: 'V'}
            ]
        },
        "3": {
            devName: ['BMS1_1', 'BMS1_2', 'BMS1_3'],
            dataLabel:["电压","电流","功率","SOC","单体最高电压","单体最低电压","单体最高温度","单体最低温度","堆单体压差","堆单体温差"],
            dataUnit:["V","A","kW","%","V","V","℃","℃","v","℃"],
            dataItem: [
                {label: '电压', unit: 'V'},
                {label: '电流', unit: 'A'},
                {label: '功率', unit: 'kW'},
                {label: 'SOC', unit: '%'},
                {label: '单体最高电压', unit: 'V'},
                {label: '单体最低电压', unit: 'V'},
                {label: '单体最高温度', unit: '℃'},
                {label: '单体最低温度', unit: '℃'},
                {label: '堆单体压差', unit: 'V'},
                {label: '堆单体温差', unit: '℃'}
            ]
        },
        "4": {
            devName: ['PCS1_METER1'],
            dataLabel:["总有功功率","当前正向总有功电能","当前反向总有功电能"],
            dataUnit:["kW","kWh","kWh"],
            dataItem: [
                {label: '总有功功率', unit: 'kW'},
                {label: '当前正向总有功电能', unit: 'kWh'},
                {label: '当前反向总有功电能', unit: 'kWh'}
            ]
        }
    };
    const CheckboxGroup = Checkbox.Group;
    const [devNameList, setDevNameList] = useState([]);
    const [devDataList, setDevDataList] = useState([]);
    const devAllCheck = {
        checkDevNameAll: devAllOptions[radioDevTypeValue]?.devName?.length === devNameList.length,
        devNameIndeterminate: devNameList.length > 0 && devNameList.length < devAllOptions[radioDevTypeValue]?.devName?.length,

        checkDevDataAll: devAllOptions[radioDevTypeValue]?.dataLabel?.length === devDataList.length,
        devDataIndeterminate: devDataList.length > 0 && devDataList.length < devAllOptions[radioDevTypeValue]?.dataLabel?.length,
    }

    const dafaultCol=[
        {
            title: '日期',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: true,
        },
        {
            title: '设备名称',
            width: 120,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            sorter: true,
        },
        {
            title: '数据项',
            dataIndex: 'address',
            key: '1',
            width: 150,
            fixed: 'left',
            sorter: true,
        },
    ];
    const [columns,setColumns] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [dataSource,setDataSource] =useState(Array.from({
        length: 100,
    }).map((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        age: 32+i,
        address: `London, Park Lane no. ${i}`,
    }))) ;

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

    const onCheckBoxChange = (list,flag) => {
        if(flag==1){
            setDevNameList(list);
        }else{
            setDevDataList(list);
        }

    };
    const onCheckAllChange = (e,flag) => {
        if(flag==1){
            setDevNameList(e.target.checked ? devAllOptions[radioDevTypeValue]?.devName : []);
        }else{
            setDevDataList(e.target.checked ? devAllOptions[radioDevTypeValue]?.dataLabel : []);
        }
    };


    const onRadioChange = (e, flag) => {
        console.log('radio checked', e.target.value, flag);
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


    const getInitData = async () => {
        let {data} = await getDataComparisonInit({plantId: localStorage.getItem('plantId')});
        let {BMS, PCS, PCSModule, others} = data?.data;

    };
    const changeDate = (val, str) => {
        console.log("str",str, "val",val)
        setDateStart(val?.[0]);
        setDateEnd(val?.[1]);
        setDateStartStr(str?.[0]);
        setDateEndStr(str?.[1]);
    }

    const downloadExcel = () => {
        let fileName = t('数据对比');
        let sheetFilter = ['time'];
        let sheetHeader = [t('时间')];
        let sheetData = [];
        let sheetName = '';
        dataOfEchart.map((it, i) => {
            if (way == 1) {
                sheetFilter.push(it.label);
                sheetHeader.push(`${it.label}`);
                sheetName = dayjs(it.value[0]?.time).format('YYYY-MM-DD');
                i == 0 ?
                    it.value?.map((item, index) => {
                        sheetData.push({
                            [it.label]: item.value,
                            time: dayjs(item.time).format('HH:mm')
                        })
                    }) : it.value?.map((item, index) => {
                        sheetData[index] = {
                            ...sheetData[index],
                            [it.label]: item.value,
                        }
                    });
            } else {
                sheetFilter.push(dayjs(it.value[0]?.time).format('YYYY-MM-DD'));
                sheetHeader.push(`${dayjs(it.value[0]?.time).format('YYYY-MM-DD')}(${it.unit})`);
                sheetName = it.label.split('/');
                i == 0 ?
                    it.value?.map((item, index) => {
                        sheetData.push({
                            [dayjs(it?.value[0]?.time).format('YYYY-MM-DD')]: item?.value,
                            time: dayjs(item?.time).format('HH:mm')
                        })
                    }) : it.value?.map((item, index) => {
                        sheetData[index] = {
                            ...sheetData[index],
                            [dayjs(it?.value[0]?.time).format('YYYY-MM-DD')]: item?.value,
                        }
                    });
            }


        });
        downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName);
    }


    const getQueryParam=()=>{
        // console.log('setDateStart:',dateStart,"setDateEnd",dateEnd)
        // console.log("dateStartStr",dateStartStr,"dateEndStr",dateEndStr,'radioTimeValue:',radioTimeValue)
        // console.log('radioDevTypeValue:',radioDevTypeValue)
        // console.log('devNameList:',devNameList)
        // console.log('devDataList:',devDataList)
        // setQueryParams();
    }
    const handleTableChange = (pagination, filters, sorter, extra) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        });
       console.log("pagination:",pagination)
        console.log("sorter:",sorter)
        console.log("tableParams:",tableParams)
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        //     setDataSource([]);
        // }
    };
    const setCol= ()=>{
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

        const interval = parseInt(radioTimeValue, 10);
        const timeCol=generateTimeArray(interval);
        setColumns(prevColumns => [...dafaultCol,...timeCol]);
    }

    const getTableData=async ()=>{
        // const differenceInDays = dateEnd.diff(dateStart, 'day');
        // if (differenceInDays > 6) {
        //     message.error(intl.formatMessage({ id: '日期范围不能超过7天' }));
        //     return;
        // }
        // if(devNameList?.length<=0){
        //     message.error(intl.formatMessage({ id: '请选择设备名称' }));
        //     return;
        // }
        // if(devDataList?.length<=0){
        //     message.error(intl.formatMessage({ id: '请选择数据项' }));
        // }


        await setCol();
        console.log("columns:",columns)
    }

    return (
        <div style={{height: '100%', width: '100%', paddingBottom: '10px'}}>
            <CardModel
                title={t('源数据导出')}
                content={
                    <div className={styles.advancedAnalytics} style={{color: token.titleColor}}>
                        <div className={styles.searchHead}>
                            <span>{t('查询日期')}:</span>
                            <Space direction="vertical" size={12}>
                                <RangePicker onChange={(val, str) => changeDate(val, str)} defaultValue={[dateStart,dateEnd]}/>
                            </Space>
                            <Button type="primary" className={styles.firstButton} onClick={getTableData}>{t('查询')}</Button>
                            <Button type="primary" style={{backgroundColor: token.defaultBg}}
                                    onClick={downloadExcel}>{t('导出')}{" "}Excel</Button>
                        </div>
                        <div className={styles.searchHead}>
                            <span>{t('时间间隔')}:</span>
                            <Radio.Group onChange={(e) => onRadioChange(e, 1)} value={radioTimeValue}>
                                {
                                    timeOptions?.map(item => {
                                        return (
                                            <Radio value={item.value}>{t(item.label)} {item.unit}</Radio>
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
                                                onChange={e=>{onCheckAllChange(e,1)}}
                                                checked={devAllCheck.checkDevNameAll}>{t("全选")}</Checkbox>
                                    </div>
                                    <div>
                                      <CheckboxGroup options={devAllOptions[radioDevTypeValue].devName}
                                                     value={devNameList} onChange={list=>{onCheckBoxChange(list,1)}}/>
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
                                                onChange={e=>{onCheckAllChange(e,2)}}
                                                checked={devAllCheck.checkDevDataAll}>{t("全选")}</Checkbox>
                                    </div>
                                    <div>
                                      <CheckboxGroup options={devAllOptions[radioDevTypeValue]?.dataLabel}
                                                     value={devDataList} onChange={list=>{onCheckBoxChange(list,2)}}/>
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