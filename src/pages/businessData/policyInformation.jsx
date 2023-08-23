import { PageTitle, Search } from "@/components";
import { Row, Button, Form, Table, Modal, Input, DatePicker, Col, Upload, Typography, Tooltip, message } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";
import { InboxOutlined } from '@ant-design/icons';
import { 
    getPolicyInformationList as getPolicyInformationListServe,
    getPolicyInformationListByParams as getPolicyInformationListByParamsServe,
    deletePolicyInformation as deletePolicyInformationServe,
    addPolicyInformation as addPolicyInformationServe,
    updatePolicyInformation as updatePolicyInformationServe,
    downloadPolicyTemplate as downloadPolicyTemplateServe
} from "@/services/serve"; 
import { splitString, downloadFile } from "@/utils/utils"
import dayjs from "dayjs";
import moment from "moment";
import { getBaseUrl } from "@/services/request";

const PolicyInformation = () => {
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [visible, setVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
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
            title: '发布时间',
            dataIndex: 'releaseTime',
            key: 'releaseTime',
            render(value){
                return moment(value).format("YYYY-MM-DD")
            }
        },
        {
            title: '发布单位',
            dataIndex: 'issueUnit',
            key: 'issueUnit',
        },
        {
            title: '发布名称',
            dataIndex: 'policyName',
            key: 'policyName',
        },
        {
            title: '政策要点',
            dataIndex: 'policyPoints',
            key: 'policyPoints',
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div>{splitString(value, 200)}</div>
                    </Tooltip>
                )
            }
        },
        {
            title: '政策解读',
            dataIndex: 'policyAnalyse',
            key: 'policyAnalyse',
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div>{splitString(value, 200)}</div>
                    </Tooltip>
                )
            }
        },
        {
            title: '原文链接',
            dataIndex: 'originalLink',
            key: 'originalLink',
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
                                    ...record,
                                    releaseTime: dayjs(record?.releaseTime)
                                })
                                setType("Edit");
                                setVisible(true);
                                setCurrentRecord(record)
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
                                    const res = await deletePolicyInformationServe({id: record?.id});
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

    const onSubmit = async () => {
        let res = null;
        try {
            const values = await form.validateFields();
            const releaseTime = moment(new Date(values?.releaseTime)).format("YYYY-MM-DD");
            if(type==="Edit"){
                res = await updatePolicyInformationServe({
                    ...values,
                    id: currentRecord?.id,
                    releaseTime
                })
            }else{
                res = await addPolicyInformationServe({
                    ...values,
                    releaseTime
                });
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
        setCurrentRecord(null)
    }

    const getList = async () => {
        setLoading(true);
        let res = null;
        const { current, pageSize } = paginationRef.current;
        if(!keyword&&!date){
            res = await getPolicyInformationListServe({
                current, 
                size: pageSize
            })
        }else{
            res = await getPolicyInformationListByParamsServe({
                current, 
                size: pageSize,
                name: keyword,
                date
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

    const onChangeDatePicker = (date, dateString) => {
        paginationRef.current = DEFAULT_PAGINATION
        setDate(dateString);
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword, date], {
        wait: 500
    });
    
    return (
        <div>
            <PageTitle title="政策信息" type="page" />
            <Row justify="space-between">
                <Col>
                    <Search 
                        style={{width: 200, marginBottom: 16, marginRight: 16}} 
                        placeholder="请输入关键字" 
                        onChange={e=>{
                            paginationRef.current = DEFAULT_PAGINATION
                            setKeyword(e.target.value);
                        }} 
                        allowClear
                    />
                    <DatePicker placeholder="请选择时间" onChange={onChangeDatePicker} />
                </Col>
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
                loading={loading}
            />
            {
                visible&&
                <Modal 
                    title={type==="Add"?"新增政策信息":"编辑政策信息"}
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
                        <Form.Item label="时间" name="releaseTime" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <DatePicker placeholder="请选择时间" />
                        </Form.Item>
                        <Form.Item label="发布单位" name="issueUnit" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入发布单位" />
                        </Form.Item>
                        <Form.Item label="发布名称" name="policyName" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入发布名称" />
                        </Form.Item>
                        <Form.Item label="政策要点" name="policyPoints" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input.TextArea placeholder="请输入政策要点" />
                        </Form.Item>
                        <Form.Item label="政策解读" name="policyAnalyse" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input.TextArea placeholder="请输入政策解读" />
                        </Form.Item>
                        <Form.Item label="原文链接" name="originalLink" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Input placeholder="请输入原文链接" />
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
                >
                    <div style={{padding: 24}}>
                        <Upload.Dragger
                            accept=".xlsx,.xls"
                            action={`${getBaseUrl()}/policy/addPolicyByTemplate`}
                            onChange={(info)=>{
                                const { status } = info.file;
                                if (status === 'done') {
                                   message.success("上传成功");
                                   paginationRef.current=DEFAULT_PAGINATION;
                                   getList();
                                } else if (status === 'error') {
                                  message.error('上传失败');
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
                                const res = await downloadPolicyTemplateServe();
                                if(res){
                                    downloadFile({
                                        content: res,
                                        fileName: '政策信息模板.xlsx'
                                    })
                                }
                            }}>模版下载</a>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default PolicyInformation;