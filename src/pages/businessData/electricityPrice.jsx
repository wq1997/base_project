import { PageTitle } from "@/components";
import { Row, Button, Form, Table, Modal, Input, Tooltip, Col, Upload, Typography, Select, InputNumber, message } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE, FORM_ONLY_NUMBER } from "@/utils/constants";
import { InboxOutlined } from '@ant-design/icons';
import { 
    getAllFirstArea as getAllFirstAreaServe,
    getSecondAreaByFirstArea as getSecondAreaByFirstAreaServe,
    getAllElectricityType as getAllElectricityTypeServe,
    getAllBillingSystem as getAllBillingSystemServe,
    getElectricityPrice as getElectricityPriceServe,
    getElectricityPriceByParams as getElectricityPriceByParamsServe,
    getAllVoltageLevel as getAllVoltageLevelServe,
    updateElectricityPrice as updateElectricityPriceServe,
    addElectricityPrice as addElectricityPriceServe,
    deleteElectricityPrice as deleteElectricityPriceServe,
    downloadElectricityPriceTemplate as downloadElectricityPriceTemplateServe
} from "@/services/serve";
import { useEffect } from "react";
import { downloadFile } from "@/utils/utils"
import { getBaseUrl, getToken } from "@/services/request";

const ElectricityPrice = () => {
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [type, setType] = useState("");
    const [currentRecord, setCurrentRecord] = useState(null);

    const [firstArea, setFirstArea] = useState([]);
    const [secondArea, setSecondArea] = useState([]);
    const [electricityType, setElectricityType] = useState([]);
    const [billingSystem, setBillingSystem] = useState([]);
    const [voltageLevel, setVoltageLevel] = useState([]);

    const [firstAreaValue, setFirstAreaValue] = useState();
    const [secondAreaValue, setSecondAreaValue] = useState();
    const [electricityTypeValue, setElectricityTypeValue] = useState();
    const [billingSystemValue, setBillingSystemValue] = useState();

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    
    const [addFirstArea, setAddFirstArea] = useState([]);
    const [addSecondArea, setAddSecondArea] = useState([]);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 100,
            render(text,record,index){
                return index+1;
            }
        },
        {
            title: '一级区域',
            dataIndex: 'districtOne',
            key: 'districtOne',
            width: 200
        },
        {
            title: '二级区域',
            dataIndex: 'districtTwo',
            key: 'districtTwo',
            width: 200
        },
        {
            title: '用电类型',
            dataIndex: 'electricityType',
            key: 'electricityType',
            width: 200
        },
        {
            title: '计费制度',
            dataIndex: 'cost',
            key: 'cost',
            width: 200
        },
        {
            title: '电压等级',
            dataIndex: 'voltageLevel',
            key: 'voltageLevel',
            width: 200
        },
        {
            title: '尖峰电价',
            dataIndex: 'cuspPrice',
            key: 'cuspPrice',
            width: 200
        },
        {
            title: '高峰电价',
            dataIndex: 'highPrice',
            key: 'highPrice',
            width: 200
        },
        {
            title: '平段电价',
            dataIndex: 'flatPrice',
            key: 'flatPrice',
            width: 200
        },
        {
            title: '谷段电价',
            dataIndex: 'lowPrice',
            key: 'lowPrice',
            width: 200
        },
        {
            title: '基本电费按需价格',
            dataIndex: 'capacityPrice',
            key: 'capacityPrice',
            width: 200
        },
        {
            title: '基本电费按容价格',
            dataIndex: 'needPrice',
            key: 'needPrice',
            width: 200
        },
        {
            title: '高峰月',
            dataIndex: 'peakMonth',
            key: 'peakMonth',
            width: 200
        },
        {
            title: '备注时段',
            dataIndex: 'remarkDate',
            key: 'remarkDate',
            width: 400,
            render: (firstArea) => (
                <Tooltip placement="topLeft" title={firstArea}>
                    {firstArea}
                </Tooltip>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 200,
        },
        {
            title: '操作',
            dataIndex: 'Actions',
            key: 'Actions',
            fixed: 'right',
            width: 200,
            render(text,record){
                return (
                    <>
                        <Button 
                            type="link"
                            onClick={async()=>{
                                const res = await getSecondAreaByFirstAreaServe({parentId: record?.districtOneId})
                                if(res?.data){
                                    setAddSecondArea(res?.data)
                                }
                                form.setFieldsValue({
                                    ...record
                                })
                                setCurrentRecord(record);
                                setType("Edit");
                                setVisible(true);
                            }}
                        >
                            编辑
                        </Button>
                        <Button 
                            type="link"
                            onClick={()=>{
                               Modal.confirm({
                                 title: "系统提示",
                                 content: "数据删除后将无法恢复，是否确认删除该条数据？",
                                 okText: '确定',
                                 cancelText: '取消',
                                 onOk: async () => {
                                    const res = await deleteElectricityPriceServe({id: record?.id});
                                    if(res?.data){
                                        getList();
                                    }
                                 }
                               });
                            }}
                        >
                            删除
                        </Button>
                    </>
                )
            }
        },
    ]

    const onSubmit = async () => {
        let res = null;
        try {
            const values = await form.validateFields();
            if(type==="Edit"){
                res = await updateElectricityPriceServe({
                    ...values,
                    id: currentRecord?.id
                })
            }else{
                res = await addElectricityPriceServe(values);
            }
            if(res?.data){
                getList();
                onCancel();
            }

          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onCancel = () => {
        setVisible(false);
        setUploadVisible(false);
        form.resetFields();
    }

    const getAllFirstArea = async () => {
        const res = await getAllFirstAreaServe();
        if(res?.data){
            setFirstArea(res?.data);
            setAddFirstArea(res?.data)
        }
    }

    const getAllElectricityType =  async () => {
        const res = await getAllElectricityTypeServe();
        if(res?.data){
            setElectricityType(res?.data);
        }
    }

    const getAllBillingSystem =  async () => {
        const res = await getAllBillingSystemServe();
        if(res?.data){
            setBillingSystem(res?.data);
        }
    }

    const getAllVoltageLevel = async () => {
        const res = await getAllVoltageLevelServe();
        if(res?.data){
            setVoltageLevel(res?.data);
        }
    }


    const getList = async () => {
        setLoading(true);
        let res = null;
        const { current, pageSize } = paginationRef.current;
        if(firstAreaValue || secondAreaValue || billingSystemValue || electricityTypeValue){
            res = await getElectricityPriceByParamsServe({
                current, 
                size: pageSize,
                districtOneId: firstAreaValue,
                districtTwoId: secondAreaValue,
                costId: billingSystemValue,
                electricityTypeId: electricityTypeValue
            })
        }else{
            res = await getElectricityPriceServe({
                current, 
                size: pageSize
            })
        }
        if(res?.data?.records){
            setDataSource(res?.data?.records);
            setPagination({
                ...paginationRef.current,
                total: res?.data?.total
            })
        }
        setLoading(false);
    }

    useEffect(()=>{
        getAllFirstArea();
        getAllElectricityType();
        getAllBillingSystem();
        getAllVoltageLevel();
    }, [])

    useEffect(()=>{
        getList();
    }, [firstAreaValue, secondAreaValue, billingSystemValue, electricityTypeValue])

    return (
        <div>
            <PageTitle title="电价列表" type="page" />
            <Row justify="space-between" style={{marginBottom: 16}}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 16
                    }}
                >
                    <Select 
                        value={firstAreaValue}
                        placeholder="请选择一级区域" 
                        style={{width: 200}} 
                        options={firstArea?.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={async (value)=>{
                            if(value){
                                const res = await getSecondAreaByFirstAreaServe({parentId: value})
                                if(res?.data){
                                    setSecondArea(res?.data)
                                }
                            }
                            setFirstAreaValue(value);
                            setSecondAreaValue(undefined);
                        }}
                        allowClear
                    />
                    <Select 
                        value={secondAreaValue}
                        placeholder="请选择二级区域"
                        style={{width: 200}} 
                        options={secondArea?.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={(value)=>setSecondAreaValue(value)}
                        allowClear
                     />
                    <Select 
                        value={electricityTypeValue}
                        placeholder="请选择用电类型" 
                        style={{width: 200}} 
                        options={electricityType?.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        allowClear
                        onChange={(value)=>setElectricityTypeValue(value)}
                    />
                    <Select 
                        value={billingSystemValue}
                        placeholder="请选择计费制度" 
                        style={{width: 200}} 
                        options={billingSystem?.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        allowClear
                        onChange={(value)=>setBillingSystemValue(value)}
                    />
                </div>
                <Col gutter={[16,16]}>
                    <Button 
                        type="primary"
                        style={{marginRight: 16}} 
                        onClick={()=>{
                            setType("Add");
                            setVisible(true)
                        }}
                    >
                        新增
                    </Button>
                    <Button 
                        type="primary"
                        onClick={()=>{
                            setUploadVisible(true)
                        }}
                    >
                        导入
                    </Button>
                </Col>
            </Row>

            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                onChange={(pagination)=>{
                    paginationRef.current = pagination;
                    getList();
                }}
                scroll={{
                    x: 2000
                }}
                loading={loading}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增电价":"编辑电价"}
                    open={visible} 
                    onOk={onSubmit} 
                    onCancel={onCancel}
                    okText="确定"
                    cancelText="取消"
                    width={700}
                >
                    <Form
                        form={form}
                        style={{marginTop: 24}}
                        autoComplete="off"
                        labelCol={{span: 5}}
                    >
                        <Form.Item label="一级区域" name="districtOneId" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Select 
                                placeholder="请选择一级区域"
                                options={addFirstArea?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                                onChange={async (value)=>{
                                    if(value){
                                        const res = await getSecondAreaByFirstAreaServe({parentId: value})
                                        if(res?.data){
                                            setAddSecondArea(res?.data)
                                        }
                                    }else{
                                        setAddSecondArea(undefined);
                                    }
                                    form.setFieldsValue({
                                        districtTwoId: undefined
                                    })
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="二级区域" name="districtTwoId" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择二级区域" 
                                options={addSecondArea?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="用电类型" name="electricityTypeId" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择用电类型" 
                                options={electricityType?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="计费制度" name="costId" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择计费制度" 
                                options={billingSystem?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="电压等级" name="voltageLevelId" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择电压等级" 
                                options={voltageLevel?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="尖峰电价" name="cuspPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber placeholder="请输入尖峰电价" style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="高峰电价" name="highPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber placeholder="请输入高峰电价" style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item label="平段电价" name="flatPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber placeholder="请输入平段电价" style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="谷段电价" name="lowPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="低谷/深谷" />
                        </Form.Item>
                        <Form.Item label="基本电费按需价格" name="capacityPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber placeholder="请输入基本电费按需价格" style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="基本电费按容价格" name="needPrice" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber placeholder="请输入基本电费按容价格" style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="高峰月" name="peakMonth" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber min={0} style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="备注时段" name="remarkDate">
                            <Input.TextArea placeholder="请输入备注时段" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
            {
                uploadVisible&&
                <Modal
                    title="导入"
                    okText="确定"
                    cancelText="取消"
                    width={700}
                    open={uploadVisible}
                    onCancel={onCancel}
                    onOk={onCancel}
                >
                    <div style={{padding: 24}}>
                    <Upload.Dragger
                            accept=".xlsx,.xls"
                            action={`${getBaseUrl()}/electricityPrice/addElectricityPriceByTemplate`}
                            headers={{
                                "Token": getToken()
                            }}
                            onChange={(info)=>{
                                const { response, status } = info.file;
                                if(response && status==="done"){
                                    if (response.code === 200) {
                                        message.success("上传成功");
                                        paginationRef.current=DEFAULT_PAGINATION;
                                        getList();
                                     } else{
                                       message.error(response.msg);
                                     }
                                }
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">点击或拖拽文件至此处上传</p>
                            <p className="ant-upload-hint">
                                请上传.xlsx .xls后缀文件
                            </p>
                        </Upload.Dragger>
                        <p>
                            <Typography.Text type="secondary">上传之前请下载模版，按照格式填入数据</Typography.Text>
                        </p>
                        <a 
                            onClick={async () => {
                                const res = await downloadElectricityPriceTemplateServe();
                                if(res){
                                    downloadFile({
                                        content: res,
                                        fileName: '电价列表模板.xlsx'
                                    })
                                }
                            }}>模版下载</a>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ElectricityPrice;