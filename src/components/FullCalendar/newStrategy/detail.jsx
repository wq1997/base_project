import { Title } from '@/components';
import { theme, Modal, Form, Input, Select, InputNumber, Typography, Table,Descriptions } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useSelector, useIntl } from "umi";

const Detail = ({ form, open, onChangeOpen,detailsData  }) => {
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
      const msg = intl.formatMessage(
        {
          id,
        },
      );
      return msg
    }
    return (
        <Modal
            title={<Title title={t("策略详情")}/>}
            open={open}
            onOk={async () => {
                const values = await form.validateFields(['name', 'datasource']);
                console.log("策略详情", values);
                onChangeOpen(false);
                form.resetFields();
            }}
            width={960}
            onCancel={()=>{
                onChangeOpen(false);
                form.resetFields();
            }}
        >
           
                {/* <Form.Item label="策略名称" name="name" rules={[FORM_REQUIRED_RULE]}>
                    <Input placeholder="请输入策略名称" style={{maxWidth: 320}} />
                </Form.Item> */}
                <Descriptions >
                 <Descriptions.Item label={t('策略名称')}>{detailsData?.strategyName}</Descriptions.Item>

                </Descriptions>
                    <Table
                        columns={[
                            {
                                title: '时段',
                                key: 'time',
                                dataIndex: 'time',
                                // width: 500,
                                render(_,record,index){
                                    // if(index===editKey){
                                    //     return (
                                    //         <Row align="middle">
                                    //             <Col span={5}>
                                    //                 <Select 
                                    //                     showSearch
                                    //                     filterOption={(input, option) =>
                                    //                         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    //                     placeholder="时"
                                    //                     options={fillInt(23, true).map((item => {
                                    //                         return {
                                    //                             label: item,
                                    //                             value: item
                                    //                         }
                                    //                     }))}
                                    //                 />
                                    //             </Col>
                                    //             <Col span={5}>
                                    //                 <Select 
                                    //                     showSearch
                                    //                     filterOption={(input, option) =>
                                    //                         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    //                     placeholder="分"
                                    //                     options={fillInt(59, true).map((item => {
                                    //                         return {
                                    //                             label: item,
                                    //                             value: item
                                    //                         }
                                    //                     }))}
                                    //                 />
                                    //             </Col>
                                    //             <Col span={1}>
                                    //                 <Row justify="center">至</Row>
                                    //             </Col>
                                    //             <Col span={5}>
                                    //                 <Select 
                                    //                     showSearch
                                    //                     filterOption={(input, option) =>
                                    //                         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    //                     placeholder="时"
                                    //                     options={fillInt(23, true).map((item => {
                                    //                         return {
                                    //                             label: item,
                                    //                             value: item
                                    //                         }
                                    //                     }))}
                                    //                 />
                                    //             </Col>
                                    //             <Col span={5}>
                                    //                 <Select 
                                    //                     showSearch
                                    //                     filterOption={(input, option) =>
                                    //                         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    //                     placeholder="分"
                                    //                     options={fillInt(59, true).map((item => {
                                    //                         return {
                                    //                             label: item,
                                    //                             value: item
                                    //                         }
                                    //                     }))}
                                    //                 />
                                    //             </Col>
                                    //         </Row>
                                    //     )
                                    // }else{
                                    //     return record?.time;
                                    // }
                                    return `${record.startHm}-${record.endHm}`
                                }
                            },

                            {
                                title: '状态',
                                key: 'actionName',
                                dataIndex: 'actionName',
                          
                            },
                            {
                                title: 'PCS功率(KW)',
                                key: 'pcsPower',
                                dataIndex: 'pcsPower',
                            },
                            {
                                title: '目标SOC(%)',
                                key: 'soc',
                                dataIndex: 'targetSoc',
                            },
                 
                        ]}
                        scroll={{
                            y: 500
                        }}
                        pagination={false}
                        dataSource={detailsData?.contentList}
                    />

            <Typography.Title level={5}>PCS功率（KW）</Typography.Title>
            <ReactECharts 
                option={{
                    color: [token.colorPrimary],
                
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['PCS功率']
                    },
                    grid:{
                        top:80,
                        bottom: 30,
                        left:40,
                        right: 40
                    },
                    xAxis: [
                        {
                            boundaryGap : false,
                            splitLine:{
                                show:false,
                            },
                            axisLine: {
                                show: false
                            },
                            type: 'category',
                            data: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00', '24:00']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                color: '#666'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'PCS功率',
                            type:'line',
                            symbol:'none',
                            step: 'end',
                            data:[200, 200, 150, 150, 120, 120, 130, 130, 150, 150, 120, 50, 120]
                        }
                    ]
                }} 
                style={{width:800,height: 300,marginBottom:60}}
            />
        </Modal>
    )
}

export default Detail;