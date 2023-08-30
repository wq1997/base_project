import { PageTitle, Search } from "@/components";
import { useDebounceEffect } from "ahooks";
import { Table, Row, Button, Modal, Form, Input, Select, Tooltip, InputNumber } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useEffect } from "react";
import { 
    getPeakMonth as getPeakMonthServe,
    getPeakMonthByName as getPeakMonthByNameServe,
    updatePeakMonth as updatePeakMonthServe,
    addPeakMonth as addPeakMonthServe,
    deletePeakMonth as deletePeakMonthServe,
    getAllFirstArea as getAllFirstAreaServe
} from "@/services/serve"; 

const PeakMonth = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [firstArea, setFirstArea] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render(text,record,index){
                return index+1;
            }
        },
        {
            title: '一级区域',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: '高峰月',
            dataIndex: 'peakMonth',
            key: 'peakMonth',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div 
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'Actions',
            key: 'Actions',
            render(text,record){
                return (
                    <Row>
                        <Button 
                            type="link"
                            onClick={()=>{
                                form.setFieldsValue({
                                    ...record
                                })
                                setType("Edit");
                                setVisible(true);
                                setCurrentRecord(record);
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
                                 onOk: async() =>{
                                    const res = await deletePeakMonthServe({id: record?.id});
                                    if(res?.data){
                                        getList();
                                    }
                                 }
                               });
                            }}
                        >
                            删除
                        </Button>
                    </Row>
                )
            }
        },
    ]
    const getList = async () => {
        setLoading(true);
        let res = null;
        const { current, pageSize } = paginationRef.current;
        if(!keyword){
            res = await getPeakMonthServe({
                current, 
                size: pageSize
            })
        }else{
            res = await getPeakMonthByNameServe({
                current, 
                size: pageSize,
                name: keyword
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

    const onSubmit = async () => {
        let res = null;
        try {
            const values = await form.validateFields();
            if(type==="Edit"){
                res = await updatePeakMonthServe({
                    ...values,
                    id: currentRecord?.id
                })
            }else{
                res = await addPeakMonthServe(values);
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
        setCurrentRecord(null);
        form.resetFields();
    }

    const getAllFirstArea = async () => {
        const res = await getAllFirstAreaServe();
        if(res?.data){
            setFirstArea(res?.data);
        }
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword], {
        wait: 500
    });

    useEffect(()=>{
        getAllFirstArea();
    }, [])
    
    return (
        <div>
            <PageTitle title="高峰月" type="page" />
            <Row justify="space-between">
                <Search 
                    style={{width: 200, marginBottom: 15}} 
                    placeholder="请输入关键字" 
                    onChange={e=>{
                        paginationRef.current = DEFAULT_PAGINATION
                        setKeyword(e.target.value);
                    }} 
                    allowClear
                />
                <Button 
                    type="primary"
                    onClick={()=>{
                        setType("Add");
                        setVisible(true)
                    }}
                >
                    新增
                </Button>
            </Row>
            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                onChange={(pagination)=>{
                    paginationRef.current = pagination;
                    getList();
                }}
                loading={loading}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增高峰月":"编辑高峰月"}
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
                        labelCol={{span: 4}}
                    >
                        <Form.Item label="所属一级区域" name="parentId" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择一级区域" 
                                options={firstArea?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="高峰月" name="peakMonth" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <InputNumber min={1} max={12} defaultValue={1} />
                        </Form.Item>
                        <Form.Item label="备注" name="remark">
                            <Input.TextArea placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default PeakMonth;