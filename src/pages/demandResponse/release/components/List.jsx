import { DemandCard, Search } from "@/components";
import { Row, Space, DatePicker, Pagination } from "antd";
import { useState, useEffect } from "react";

const List = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=>{
        setDataSource([
            {
                time: '09-17 18:00~22:00',
                status: "Created",
                declarationType: '削峰',
                declarationCount: '20',
                market: '江苏现货市场',
                area: '全域',
                invitationCode: '202309171800',
                price: '3000'
            },
            {
                time: '08-14 11:00~18:00',
                status: "Declared",
                declarationType: '削峰',
                declarationCount: '30',
                market: '江苏现货市场',
                area: '全域',
                invitationCode: '202308141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                declarationType: '削峰',
                declarationCount: '40',
                market: '江苏现货市场',
                area: '全域',
                invitationCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                declarationType: '削峰',
                declarationCount: '20',
                market: '江苏现货市场',
                area: '全域',
                invitationCode: '202306141100',
                price: '3000'
            }
        ])
    }, [])
    return (
        <div>
            <Row justify="space-between" align="middle" style={{marginBottom: 20}}>
                <Space>
                    <Search style={{width: 250}} />
                    <DatePicker style={{width: 250}} />
                </Space>
                <Pagination simple defaultCurrent={1} total={50} />
            </Row>
            <DemandCard dataSource={dataSource}/>
        </div>
    )
}

export default List;