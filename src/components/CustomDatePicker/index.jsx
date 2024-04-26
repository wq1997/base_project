import { Select, Space, Form, Button } from "antd";
import moment from "moment";
import { useEffect } from "react";

const rangeTime = (length) => {
    return new Array(length).fill(0).map((_,index) => index<=9?`0${index}`:`${index}`)
}

const CustomDatePicker = (props) => {
    const [form] = Form.useForm();
    const { onChange, value } = props;

    useEffect(()=>{
        if(value){
            const timeList = value.split("~");
            const group1 = timeList[0], group2 = timeList[1];
            form.setFieldsValue({
                startTime1: group1?.split(":")?.[0],
                endTime1: group1?.split(":")?.[1],
                startTime2: group2?.split(":")?.[0],
                endTime2: group2?.split(":")?.[1],
            })
        }
    }, [value])
    return (
        <Form 
            form={form}
            onValuesChange={async () => {
                await form.validateFields();
            }}
        >
                <Form.Item
                    name=""
                    style={{margin: 0}}
                    dependencies={['startTime1', 'endTime1', 'startTime2', 'endTime2']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const startTime1 = getFieldValue('startTime1');
                                const endTime1 = getFieldValue('endTime1');
                                const startTime2 = getFieldValue('startTime2');
                                const endTime2 = getFieldValue('endTime2');
                                if(startTime1&&endTime1&&startTime2&&endTime2){
                                    const flag = moment(`1997/05/05 ${startTime1}:${endTime1}:00`).isBefore(moment(`1997/05/05 ${startTime2}:${endTime2}:00`));
                                    if(!flag){
                                        return Promise.reject("起始时间应该早于结束时间");
                                    }
                                    onChange(`${startTime1}:${endTime1}~${startTime2}:${endTime2}`)
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                    required
                >
                    <div
                        style={{
                            display: 'flex',
                            ...props.style||{}
                        }}
                    >
                        <div style={{display: 'flex', width: '50%'}}>
                            <Form.Item 
                                name={'startTime1'}
                                style={{width: '100%', margin: 0}}
                                rules={[
                                    {
                                        required: true,
                                        message: `必填!`,
                                    },
                                ]}
                            >
                                <Select 
                                    style={{width: '100%'}}
                                    options={rangeTime(24).map(item => {
                                        return {
                                            value: item,
                                            label: item
                                        }
                                    })}
                                /> 
                            </Form.Item>
                            <div style={{margin: '0 5px'}}>:</div> 
                            <Form.Item 
                                name={'endTime1'}
                                style={{width: '100%', margin: 0}}
                                rules={[
                                    {
                                        required: true,
                                        message: `必填!`,
                                    },
                                ]}
                            >
                                <Select  
                                    style={{width: '100%'}}
                                    options={rangeTime(60).map(item => {
                                        return {
                                            value: item,
                                            label: item
                                        }
                                    })}
                                />
                            </Form.Item>
                        </div>
                        <div> ~ </div>
                        <div style={{display: 'flex', width: '50%'}}>
                            <Form.Item 
                                name={'startTime2'}
                                style={{width: '100%', margin: 0}}
                                rules={[
                                    {
                                        required: true,
                                        message: `必填!`,
                                    },
                                ]}
                            >
                                <Select  
                                    style={{width: '100%'}}
                                    options={rangeTime(24).map(item => {
                                        return {
                                            value: item,
                                            label: item
                                        }
                                    })}
                                /> 
                            </Form.Item>
                            <div style={{margin: '0 5px'}}>:</div>  
                            <Form.Item 
                                name={'endTime2'}
                                style={{width: '100%', margin: 0}}
                                rules={[
                                    {
                                        required: true,
                                        message: `必填!`,
                                    },
                                ]}
                            >
                                <Select  
                                    style={{width: '100%'}}
                                    options={rangeTime(60).map(item => {
                                        return {
                                            value: item,
                                            label: item
                                        }
                                    })}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form.Item>
        </Form>
    )
}

export default CustomDatePicker;