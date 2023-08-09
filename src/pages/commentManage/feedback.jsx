import { PageTitle, Search } from "@/components";
import { Row, Button, Table, Modal } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";

const Feedback = () => {
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

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
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '反馈类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '反馈内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '图片',
            dataIndex: 'pic',
            key: 'pic',
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
                                 onOk(){
                                    console.log("删除")
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
        console.log("意见反馈", keyword, pagination)
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword, pagination], {
        wait: 300
    });

    return (
        <div>
            <PageTitle title="意见反馈" type="page" />
            <Row justify="space-between">
                <Search 
                    style={{width: 200, marginBottom: 15}} 
                    placeholder="请输入关键字" 
                    onChange={e=>{
                        setKeyword(e.target.value);
                        setPagination(DEFAULT_PAGINATION);
                    }} 
                />
            </Row>
            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={[
                    {
                        id: '1',
                        type: '政策',
                        content: '哈哈哈哈哈哈'
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
            />
        </div>
    )
}

export default Feedback;