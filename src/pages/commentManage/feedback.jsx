import { PageTitle, Search } from "@/components";
import { Row, Button, Table, Modal, Image, Tooltip } from "antd";
import { useState, useRef } from "react";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";
import { 
    getFeedback as getFeedbackServe,
    getFeedbackByName as getFeedbackByNameServe,
    deleteFeedback as deleteFeedbackServe
} from "@/services/serve"; 

const Feedback = () => {
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
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
            title: '账号',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '反馈类型',
            dataIndex: 'feedbackType',
            key: 'feedbackType',
        },
        {
            title: '反馈内容',
            dataIndex: 'text',
            key: 'text',
            width: 400,
            render: (text) => (
                <Tooltip placement="topLeft" title={text} overlayStyle={{ maxWidth: 550 }}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '图片',
            dataIndex: 'imgPath',
            key: 'imgPath',
            render(value){
                let imgList = [];
                if(value){
                    value = value.replaceAll('[', '')?.replaceAll(']', '')
                    imgList = value?value.split(", "):[]
                }
                return (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 50px)',
                            gap: 10
                        }}
                    >
                        {
                            imgList?.map(url => {
                                return <Image src={`https://energy.sermatec-cloud.com/file/${url}`} />
                            })
                        }
                    </div>
                )
            }
        },
        {
            title: '反馈时间',
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
                               Modal.confirm({
                                 title: "系统提示",
                                 content: "数据删除后将无法恢复，是否确认删除该条数据？",
                                 okText: '确定',
                                 cancelText: '取消',
                                 onOk: async () => {
                                    const res = await deleteFeedbackServe({id: record?.id});
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
            res = await getFeedbackServe({
                current, 
                size: pageSize
            })
        }else{
            res = await getFeedbackByNameServe({
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

    useDebounceEffect(()=>{
        getList();
    }, [keyword], {
        wait: 500
    });

    return (
        <div>
            <PageTitle title="意见反馈" type="page" />
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
        </div>
    )
}

export default Feedback;