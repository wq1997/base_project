// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getDataComparisonInit, getCompareData } from '@/services/report'
import { getDataParams } from '@/services/deviceTotal';

import dayjs from 'dayjs';
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { useSelector, useIntl } from "umi";
const { SHOW_CHILD } = Cascader;
function Com(props) {
  const { token } = theme.useToken();
  const [option, setOption] = useState([]);
  const [way, setWay] = useState(1);
  const id = getQueryString('id') || 0;
  const [date, setDate] = useState(dayjs(new Date()));
  const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dateBottom, setDateBottom] = useState(dayjs(new Date()));
  const [packReq, setPackReq] = useState([]);
  const [packList, setPackList] = useState([]);
  const [dataOfEchart, setDataOfEchart] = useState([]);
  const [cellReq, setCellReq] = useState(['0-0', '0-0-0']);
  const [optionEchartTem, setOptionEchartTem] = useState({})
  const [optionEchart, setOptionEchart] = useState({})
  const [cascaderValue, setCascaderValue] = useState([]);

  const intl = useIntl();

  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const wayOption = [{
    label: t('相同时间 不同数据项'),
    value: 1,
},
{
    label: t('不同时间  相同数据项'),
    value: 2,
},]
  const initOption = () => {
    setOptionEchartTem(baseOption);
  };
  useEffect(() => {
    initOption();
    getInitData();
    // getChartData();
  }, [token, id]);

  const getInitData = async () => {
    let { data } = await getDataComparisonInit({ plantId: localStorage.getItem('plantId') });
    let { BMS, PCS, PCSModule, others } = data?.data;
    let arr = [];
    arr.push(delInitData(PCSModule, 'PCSModule'));
    arr.push(delInitData(BMS, 'BMS'));
    arr.push(delInitData(PCS, 'PCS'));
    arr.push(delInitData(others, 'others'));
    let devId = "";
    let gridPoint = "";
    let currentValue = "";
    arr?.forEach(item => {
      if (!devId) {
        currentValue = item.value;
        devId = item?.children?.[0]?.id;
      }
    });
    if (devId) {
      let { data: subData } = await getDataParams({ devId: devId, });
      const index = arr.findIndex(item => item.value === currentValue);
      if (subData?.data?.length > 0) {
        arr[index].children[0].children = subData.data?.map(item => {
          return {
            value: item?.dataType,
            label: item?.dataTypeDesc
          }
        });
        setCascaderValue([[currentValue, `${arr[index]?.children?.[0].id},${arr[index]?.children?.[0].gridPoint}`, subData.data?.[0]?.dataType]]);
        let { data } = await getCompareData({
          dataParams: [{ devId: arr[index]?.children?.[0].id, dataId: subData.data?.[0]?.dataType, gridPoint:arr[index]?.children?.[0].id==0?gridPoint:undefined }],
          dateList: ["2024-05-08" || dateStr],
          compareType: way
        });
        setPackList(arr);
        setDataOfEchart(data?.data);
        handelData(data?.data, setOptionEchart);
        console.log(way,arr,'way');
        way == 1 ? setPackReq([[arr?.[0]?.value, `${arr?.[0]?.children?.[0]?.id},${arr?.[0]?.children?.[0]?.gridPoint}`, arr?.[0]?.children?.[0]?.children?.[0]?.value]]) : setPackReq([arr?.[0]?.value, `${arr?.[0]?.children?.[0]?.id},${arr?.[0]?.children?.[0]?.gridPoint}`, arr?.[0]?.children?.[0]?.children?.[0]?.value]);
      }
      return;
    }
   
  };
  const delInitData = (data, Name) => {
    let arr = [];
    data?.map(it => {
      arr.push({
        ...it,
        label: it.name,
        value: `${it.id},${it.gridPoint}`,
        isLeaf: false,
        // disableCheckbox: true,

      })
    });
    return {
      value: Name,
      label: Name,
      isLeaf: false,
      disableCheckbox: true,
      children: [...arr]
    }
  }
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    if (selectedOptions.length == 2) {
      let { data } = await getDataParams({ plantId: localStorage.getItem('plantId'), devId: targetOption.id });
      data.data.map(it => {
        it.value = it.dataType;
        it.label = it.dataTypeDesc;
      })
      targetOption.children = data.data;
      setPackList([...packList]);
    } else {
      console.log(selectedOptions.length, 12121212);
    };
  };
  const getChartData = async () => {
    console.log(packReq,12121221);
    let dataTypeList = [];
    let dateList = [];
    if (way === 1) {
      dataTypeList = packReq?.map(it => {
        if (Array.isArray(it)) {
          if (it?.[1]?.split(',')?.[0] == 0) {
            return { devId: +it?.[1]?.split(',')?.[0], dataId: +it[2], gridPointId: +it?.[1]?.split(',')?.[1] };
          } else {
            return { devId: +it?.[1]?.split(',')?.[0], dataId: +it[2] };
          }
        } else {
          return { devId: +it?.[1]?.split(',')?.[0], dataId: +it[2] };
        }
      });
      dateList = [dateStr];
      if (dataTypeList.length > 3) {
        message.warning(t('最多选择3个对比项'));
        return
      }
      if (dataTypeList.find(it => it.dataId == undefined)) {
        message.warning('请准确选择数据项');
        return
      }
    } else {
      console.log(packReq);
      if (packReq?.[1]?.split(',')?.[0] === 0) {
        dataTypeList = [{ devId: packReq?.[1]?.split(',')?.[0], gridPoint: packReq?.[1]?.split(',')?.[1], dataId: packReq?.[2] }];
      } else {
        dataTypeList = [{ devId: packReq?.[1]?.split(',')?.[0], dataId: packReq?.[2] }];
      }
      dateList = dateStr;
      if (dateList.length > 3) {
        message.warning(t('最多选择3个对比项'));
        return
      }
    }
    let { data } = await getCompareData({
      dataParams: dataTypeList,
      dateList,
      compareType: way
    });
    setDataOfEchart(data?.data);
    handelData(data?.data, setOptionEchart);
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
        sheetHeader.push(`${it.label}(${it.unit})`);
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
  const handelData = (data, setHandel) => {
    let series = [];
    let yAxis = [];
    data?.map((one, index) => {
      let seriesData = [];
      one?.value?.map(it => {
        seriesData.push([
          dayjs(it.time).format('HH:mm'),
          it.value,
        ])
      })
      if (one?.value) {
        series.push({
          name: way == 1 ? one?.label : dayjs(one?.value[0]?.time).format('YYYY-MM-DD'),
          type: 'line',
          symbolSize: 8,
          yAxisIndex: index,
          itemStyle: {
            normal: {
              color: token.chartLineColor[index],
              lineStyle: {
                color: token.chartLineColor[index],
                width: 2
              },
            }
          },
          data: seriesData
        });
        yAxis.push({
          type: 'value',
          position: index == 0 ? 'left' : 'right',
          offset: index == 0 || index == 1 ? 0 : 100 * index,
          alignTicks: true,
          name: one?.unit,
          // name: way==1? one?.label:dayjs(one.value[0]?.time).format('YYYY-MM-DD'),
          axisLabel: {
            show: true,
            formatter: `{value}`
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: token.chartLineColor[index]
            }
          },

        });
        setHandel({
          ...baseOption,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            // formatter: (params) => getToolTip(params, data),
          }, yAxis: [...yAxis], legend: { ...baseOption.legend, data: series?.map(item => item.name) }, series: [...series]
        });
      } else {
        yAxis.push({
        });
        setHandel({
          ...baseOption,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            // formatter: (params) => getToolTip(params, data),
          }, yAxis: [...yAxis], legend: { ...baseOption.legend, data: series?.map(item => item.name) }, series: [...series]
        });
      }
    })

  }
  const changePack = (val, selectedOptions) => {
    loadData(selectedOptions[selectedOptions.length - 1]);
    setPackReq(val);
    console.log(val, selectedOptions);
  }
  const changeWay = (val) => {
    console.log(packList, 12121);
    setWay(val);
    setDate(dayjs(new Date()));
    setOptionEchart(baseOption);
    val === 1 ? setPackReq([[packList?.[0]?.value, `${packList?.[0]?.children?.[0]?.id},${packList?.[0]?.children?.[0]?.gridPoint}`, packList?.[0]?.children?.[0]?.children?.[0]?.value]]) : setPackReq([packList?.[0]?.value, `${packList?.[0]?.children?.[0]?.id},${packList?.[0]?.children?.[0]?.gridPoint}`, packList?.[0]?.children?.[0]?.children?.[0]?.value]);
    val === 1 ? setDateStr(dayjs(new Date()).format('YYYY-MM-DD')) : setDateStr([dayjs(new Date()).format('YYYY-MM-DD')]);
    // getChartData();
  }
  const changeDate = (val, str) => {
    setDateStr(str);
    setDate(val);
  }
  const getToolTip = (params, data) => {
    let text = '';
    if (data.length == params.length) {
      params?.forEach(({ seriesName, dataIndex, seriesIndex, color }) => {
        console.log(params, data[seriesIndex].data[dataIndex], 100000);
        return
        text = text.concat(`
                    <div>
                      <span style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
                      ${data[seriesIndex].date}：${time} <br/>
                      ${t('电压差')}：${diff || ""} <br/>
                      ${t("最大电压")}：${maxPackValue || ""} (${t("第")}${maxPackNo || ""}${t("节")})<br/>
                      ${t("最小电压")}：${minPackValue || ""} (${t("第")}${minPackNo || ""}${t("节")})<br/>
                      </div>`);

      })

      return text
    }

  }
  const baseOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      icon: 'circle',
      top: '0%',
      left: '5%',
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: '#556677'
      }
    },
    xAxis: [
      {
        type: 'category',
        name: t("时间"),
        splitNumber: 12,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          // interval: 0,
        },
      }
    ],
    dataZoom: [{ type: "inside" }],
    toolbox: {
      show: true,
      right: 25,
      feature: {
        magicType: { type: ["line", "bar"], title: "", default: "line" },
        dataZoom: {
          yAxisIndex: "none",
        },
        saveAsImage: {},
      },
    },
    yAxis: [
      {
        type: 'value',
      }
    ],
    series: []
  }
  return (
    <div style={{ height: '100%', width: '100%', paddingBottom: '10px' }}>
      <CardModel
        title={t('数据对比')}
        content={
          <div className={styles.advancedAnalytics} style={{ color: token.titleColor }}>
            <div className={styles.searchHead}>
              <span >{t('对比方式')}:</span>
              <Select
                className={styles.margRL}
                style={{ width: 180 }}
                onChange={(val) => changeWay(val)}
                options={wayOption}
                defaultValue={wayOption[0].value}
              >
              </Select>
              <span >{t('数据项')}:</span>
              {
                <Cascader
                  className={styles.margRL}
                  style={{ width: 300 }}
                  onChange={changePack}
                  options={packList}
                  loadData={loadData}
                  multiple={way === 1 ? true : false}
                  maxTagCount={1}
                  showCheckedStrategy={SHOW_CHILD}
                  defaultValue={cascaderValue}
                  key={`${way}${cascaderValue}`}
                  allowClear={false}
                >
                </Cascader>
              }

              <span >{t('对比日期')}:</span>
              <DatePicker className={styles.margRL}
                style={{ width: 240 }}
                multiple={way === 1 ? false : true}
                maxTagCount={1}
                onChange={(val, str) => changeDate(val, str)}
                defaultValue={date}
                key={way + 1}
                allowClear={false}
                needConfirm
              />
              <Button type="primary" className={styles.firstButton} onClick={getChartData}>
                {t('查询')}
              </Button>
              <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downloadExcel}>
              {t('导出')}{" "}Excel
              </Button>
            </div>
            <div className={styles.echartPart}>
              <div className={styles.echartPartCardwrap}>
                <ReactECharts layUpdate={false} notMerge={true} option={optionEchart} style={{ height: '100%' }} />
              </div>
            </div>
          </div>
        }

      />
    </div>

  )
}

export default Com