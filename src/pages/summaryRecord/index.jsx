import { Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import Chart from "./chart";

const Home = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <div style={{marginBottom: 30}}>
                <Form 
                    form={form} 
                    layout="inline"
                    onFinish={(values)=>{
                        let format = "YYYY-MM-DD"
                        const uploadTimeType = values?.uploadTimeType || "day";
                        if(uploadTimeType==="month"){
                            format = "YYYY-MM"    
                        }
                        if(uploadTimeType==="year"){
                            format = "YYYY"
                        }
                        values.startTime = values.uploadTime?.[0]? dayjs(values.uploadTime[0]).format(format) : ''
                        values.endTime = values.uploadTime?.[1]? dayjs(values.uploadTime[1]).format(format): '';
                        console.log(values);
                    }}  
                >
                    <Form.Item label="项目名称" name="name">
                        <Input placeholder="请输入项目名称" style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item label="时间刻度" name="uploadTimeType">
                        <Select 
                            placeholder="请选择时间刻度"
                            options={[
                                {label: '天', value: 'day'},
                                {label: '月', value: 'month'},
                                {label: '年', value: 'year'},
                            ]}
                            style={{width: 200}}
                        />
                    </Form.Item>
                    <Form.Item dependencies={["uploadTimeType"]}>
                        {({ getFieldsValue })=>{
                            const uploadTimeType = getFieldsValue(['uploadTimeType'])?.uploadTimeType;
                            return (
                                <Form.Item label="上传时间" name={"uploadTime"}>
                                    <DatePicker.RangePicker
                                        style={{width: 250}}
                                        picker={uploadTimeType}
                                    />
                                </Form.Item>
                            )
                        }}
                    </Form.Item>
                    <Form.Item label="数据刻度" name="dataType">
                        <Select 
                            placeholder="请选择数据刻度"
                            options={[
                                {label: '1', value: '1'},
                                {label: '5', value: '5'},
                                {label: '10', value: '10'},
                                {label: '20', value: '20'}
                            ]}
                            style={{width: 200}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">生成汇总记录</Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{height: 650, display: 'flex'}}>
                <div style={{width: '50%'}}>
                    <Chart title="2023年项目异常数据汇总"/>
                </div>
                <div style={{width: '50%'}}>
                    <Chart title="2023年1~6月鹰普项目异常数据汇总"/>
                </div>
            </div>
        </div>
    )
} 

export default Home;