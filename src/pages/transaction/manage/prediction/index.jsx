import { useState } from "react";
import { SearchInput } from "@/components";
import { Card, Space, Button, Typography } from "antd";
import PriceChart from "./dayPriceChart";

const { Title } = Typography;
const Prediction = () => {
    const [marketNameList, setMarketNameList] = useState([
        {name: '华东现货交易市场', code: 'A'},
        {name: '华南现货交易市场', code: 'B'}
    ])
    const [nodeTypeList, setNodeTypeList] = useState([
        {name: '模拟市场通用节点', code: 'A'}
    ])
    const [transactionTypeList, setTransactionTypeList] = useState([
        {name: '全部', code: 'A'}
    ])

    return (
        <div>
            <Card style={{ marginTop: 20}}>
                <Title level={3} style={{ marginTop: 0, display: 'block' }}>交易日电价预测</Title>
                <Space direction="vertical">
                    <Space>
                        <SearchInput
                            label="市场名称"
                            type="select"
                            options={marketNameList}
                            value={"A"}
                        />
                        <SearchInput
                            label="节点类型"
                            type="select"
                            options={nodeTypeList}
                            value={"A"}
                        />
                        <SearchInput
                            label="交易类型"
                            type="select"
                            options={transactionTypeList}
                            value={"A"}
                        />
                    </Space>
                    <Space>
                        <SearchInput
                            label="展示模式"
                            type="select"
                            options={[
                                {name: '96点位', code: 'A'}
                            ]}
                            value={"A"}
                        />
                        <SearchInput
                            type="select"
                            options={[
                                {name: '连续时序模式', code: 'A'}
                            ]}
                            value={"A"}
                        />
                        <SearchInput
                            label="交易类型"
                            type="select"
                            options={[
                                {name: '统一纵轴', code: 'A'}
                            ]}
                            value={"A"}
                        />
                        <Button type="primary">搜索</Button>
                        <Button>重置</Button>
                    </Space>
                </Space>
                <div style={{marginTop: 20}}>
                    <PriceChart />
                </div>
            </Card>
        </div>
    )
}

export default Prediction;