import { Title } from '@/components';
import { Modal, Form, InputNumber, Select, DatePicker, Col, Row, Button } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { fillInt } from "@/utils/utils";
import styles from './index.less'
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactECharts from "echarts-for-react";
const categories = [  '谷','平', '峰','尖',];
const types = [
    { name: '谷', color: '#03B4B4' },
    { name: '平', color: '#49ADEE' },
    { name: '峰', color: '#7477F5' },
    { name: '尖', color: '#7b9ce1' },

];
const create = (minute) => {
    let seconds = minute * 60;
    let len = (60 * 24 * 60) / seconds; //数组长度
    const newArr = []
    for (let i = 0, total = 0; i < len; i++) {
        let h = parseInt(total / 3600),
            min = parseInt(total % 3600 / 60);
        newArr.push(s(h) + ':' + s(min));
        total += seconds;
    }
    return newArr;
}
const s = (n) => {
    return n < 10 ? '0' + n : n
};
const renderItem = (params, api) => {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height = api.size([0, 1])[1] * 0.8;
    let rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
    );
    return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
    );
}
let datax = create(1);
const NewPriceRule = ({ form, dataSource, open, onChangeOpen, addPriceRules }) => {
    const [option, setOption] = useState(    {
        tooltip: {
            formatter: function (params) {
                // return params.marker + params.name + ': ' + params.value[3] + ' ms';
            }
        },
        title: {
            //   text: 'Profile',
            left: 'center'
        },
        dataZoom: [
            {
                type: 'slider',
                filterMode: 'weakFilter',
                showDataShadow: false,
                top: 400,
                labelFormatter: ''
            },
            {
                type: 'inside',
                filterMode: 'weakFilter'
            }
        ],
        grid: {
            left: 50,
            right: 50,
            top: 10,
            bottom: 10
        },
        xAxis: {
            position: 'top',
            data: datax

        },
        yAxis: {
            axisLine: {
                show: false, // 不显示坐标轴线
          },
          axisTick:{
            show:false // 不显示坐标轴刻度线
      },
      splitLine:{
        show:true // 不显示网格线
   },
            data: categories
        },
        series: [
            {
                type: 'custom',
                renderItem: renderItem,
                itemStyle: {
                    opacity: 0.8,
                    borderWidth: '100%',
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
                data: [
                         {
                        name: '尖',
                        value: [0, '00:00', '00:50'],
                        itemStyle: {
                            normal: {
                                color: types[0].color,

                            }
                        }
                    },
                    {
                        name: '峰',
                        value: [1, '00:50', '12:50', 50],
                        itemStyle: {
                            normal: {
                                color: types[1].color
                            }
                        }
                    },
            ]
            }
        ]
    });
    const [dataY, setDataY] = useState([
       ]);

    useEffect(()=>{
        setOption(
            {
            tooltip: {
                formatter: function (params) {
                    // return params.marker + params.name + ': ' + params.value[3] + ' ms';
                }
            },
            title: {
                //   text: 'Profile',
                left: 'center'
            },
            dataZoom: [
                {
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    top: 400,
                    labelFormatter: ''
                },
                {
                    type: 'inside',
                    filterMode: 'weakFilter'
                }
            ],
            grid: {
                height: 300
            },
            xAxis: {
                position: 'top',
                data: datax
    
            },
            yAxis: {
                axisLine: {
                    show: false, // 不显示坐标轴线
              },
              axisTick:{
                show:false // 不显示坐标轴刻度线
          },
          splitLine:{
            show:true // 不显示网格线
       },
                data: categories
            },
            series: [
                {
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                        opacity: 0.8,
                        borderWidth: '100%',
                    },
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    data: [
                        ...dataY
                    //     {
                    //     name: '尖',
                    //     value: [0, '00:00', '00:50'],
                    //     itemStyle: {
                    //         normal: {
                    //             color: types[0].color,

                    //         }
                    //     }
                    // },
                    // {
                    //     name: '峰',
                    //     value: [1, '00:50', '12:50', 50],
                    //     itemStyle: {
                    //         normal: {
                    //             color: types[1].color
                    //         }
                    //     }
                    // },
                    // {
                    //     name: '平',
                    //     value: [2, '12:50', '16:50', 50],
                    //     itemStyle: {
                    //         normal: {
                    //             color: types[2].color
                    //         }
                    //     }
                    // },
                    // {
                    //     name: '谷',
                    //     value: [3, '16:50', '23:59', 50],
                    //     itemStyle: {
                    //         normal: {
                    //             color: types[3].color
                    //         }
                    //     }
                    // }
                ]
                }
            ]
        }
    )

    },[JSON.stringify(dataY)])


    return (
        <Modal
            title={<Title title="时段电价" />}
            open={open}
            onOk={async () => {
                const values = await form.validateFields(['timeType']);
                values.startDate = values.startDate.format('MM-DD');
                values.endDate = values.endDate.format('MM-DD');
                addPriceRules(values);
                onChangeOpen(false);
                form.resetFields();
                console.log("新增电价规则", values, values.startDate.format('MM-DD'));

            }}
            width={960}
            onCancel={() => {
                onChangeOpen(false);
                form.resetFields();
            }}
        >
            <Form
                form={form}
                labelCol={{
                    span: 3
                }}
            >
                <Row gutter={5} style={{ width: '90%' }}>
                    <Col span={5}>
                        <Form.Item style={{ marginBottom: 0 }} name="timeType" rules={[FORM_REQUIRED_RULE]}>
                            <Select
                                options={dataSource.map(it => {
                                    return {
                                        label: it.name,
                                        value: it.value
                                    }
                                })}
                                placeholder='尖'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            name=""
                            dependencies={['hour1', 'min1', 'hour2', 'min2']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        console.log("AAAA")

                                        const hour1 = getFieldValue('hour1');
                                        const min1 = getFieldValue('min1');
                                        const hour2 = getFieldValue('hour2');
                                        const min2 = getFieldValue('min2');
                                        if (hour1 && min1 && hour2 && min2) {
                                            const YMD = moment().format('YYYY-MM-DD');
                                            const flag = moment(`${YMD} ${hour1}:${min1}`).isBefore(moment(`${YMD} ${hour2}:${min2}`));
                                            if (!flag) {
                                                return Promise.reject('起始时间应该早于结束时间');
                                            }
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Row gutter={5} style={{ width: '100%' }}>
                                <Col span={4}>
                                    <Form.Item name="hour1" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
                                        <Select
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="时"
                                            options={fillInt(23, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item name="min1" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
                                        <Select
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="分"
                                            options={fillInt(59, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <Row justify="center" style={{ marginTop: 5 }}>-</Row>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name="hour2"
                                        style={{ marginBottom: 0 }}
                                        rules={[FORM_REQUIRED_RULE]}
                                    >
                                        <Select
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="时"
                                            options={fillInt(24, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item name="min2" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
                                        <Select
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="分"
                                            options={fillInt(59, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Button type='primary' style={{ backgroundColor: '#7989B2' }} onClick={async()=>{
                                        const values = await form.validateFields();
                                        let arr=[];
                                        const hour1 = values.hour1;
                                        const min1 =  values.min1;
                                        const hour2 =  values.hour2;
                                        const min2 =  values.min2;
                                        arr.push({
                                            name:categories[values?.timeType],
                                                value: [values?.timeType, `${hour1}:${min1}`, `${hour2}:${min2}`],
                                                itemStyle: {
                                                    normal: {
                                                        color: types[values?.timeType].color,
                                                    }
                                                }
                                        });
                                        setDataY([...dataY,...arr])
                                        console.log(form.getFieldsValue(),arr,option,1111111);

                                    }}>+</Button>
                                </Col>
                                <Col span={2}>
                                    <Button type='primary' style={{ backgroundColor: '#7989B2' }}>-</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button type='primary'>清空时段</Button>
                    </Col>
                </Row>
            </Form>

            <div className={styles.wrap}>
                <ReactECharts option={option} style={{ width: 900, height: 500 }} />
            </div>


        </Modal>
    )
}

export default NewPriceRule;