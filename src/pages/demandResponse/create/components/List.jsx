import { DemandCard, Search } from "@/components";
import { Row, Space, DatePicker, Pagination } from "antd";
import { useState, useEffect } from "react";

const List = ({data}) => {
    const [dataSource, setDataSource] = useState([]);
    
    useEffect(()=>{
        setDataSource(data)
    }, [JSON.stringify(data)]);

    return (
        <div>
            <Row justify="space-between" align="middle" style={{marginBottom: 20}}>
                <Space>
                    <Search style={{width: 250}} />
                    <DatePicker style={{width: 250}} />
                </Space>
                <Pagination simple defaultCurrent={1} total={50} />
            </Row>
            <DemandCard showAction={false} dataSource={dataSource}/>
        </div>
    )
}

export default List;