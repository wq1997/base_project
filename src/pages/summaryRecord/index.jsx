import { Form, Input, Select, DatePicker, Button, Empty, message } from "antd";
import { sceneGetTotalRecord as sceneGetTotalRecordServe } from "@/services/api"; 
import dayjs from "dayjs";
import Chart from "./chart";
import { useState } from "react";

const Home = () => {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState(null);
    const [dataSource, setDataSource] = useState();

    return (
        <div>
            <div style={{marginBottom: 50}}>
                <Form 
                    form={form} 
                    layout="inline"
                    onFinish={async (values)=>{
                        let format = "YYYY-MM-DD"
                        const timePeriod = values?.timePeriod || "DAY";
                        if(timePeriod==="MONTH"){
                            format = "YYYY-MM"    
                        }
                        if(timePeriod==="YEAR"){
                            format = "YYYY"
                        }
                        if(!values?.timePeriod||!values?.uploadTime){
                            message.error(!values?.timePeriod?"请选择时间刻度！":"请选择上传时间！");
                            return;
                        }
                        values.uploadDateFrom = values.uploadTime?.[0]? dayjs(values.uploadTime[0]).format(format) : ''
                        values.uploadDateTo = values.uploadTime?.[1]? dayjs(values.uploadTime[1]).format(format): '';
                        const result = await sceneGetTotalRecordServe(values);
                        if(result?.data?.data){
                            setDataSource(result?.data?.data);
                            setSearchParams(values);
                        }
                    }}  
                >
                    <Form.Item label="项目名称" name="projectName">
                        <Input placeholder="请输入项目名称" style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item label="时间刻度" name="timePeriod">
                        <Select 
                            placeholder="请选择时间刻度"
                            options={[
                                {label: '天', value: 'DAY'},
                                {label: '月', value: 'MONTH'},
                                {label: '年', value: 'YEAR'},
                            ]}
                            style={{width: 200}}
                        />
                    </Form.Item>
                    <Form.Item dependencies={["timePeriod"]}>
                        {({ getFieldsValue })=>{
                            const timePeriod = getFieldsValue(['timePeriod'])?.timePeriod;
                            return (
                                <Form.Item label="上传时间" name={"uploadTime"}>
                                    <DatePicker.RangePicker
                                        style={{width: 250}}
                                        picker={timePeriod?.toLocaleLowerCase()}
                                    />
                                </Form.Item>
                            )
                        }}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">生成汇总记录</Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{height: 620, position: 'relative'}}>
                {
                    dataSource?
                    <Chart 
                        dataSource={dataSource}
                        title={`${searchParams?.uploadDateFrom}至${searchParams?.uploadDateTo} ${searchParams?.projectName||""}项目异常数据汇总`}
                    />
                    :
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    </div>
                }
            </div>
        </div>
    )
} 

export default Home;