import { Button, Row, Card, Typography, Space, DatePicker, Modal, Upload } from "antd";
import { useState } from "react";
import { SearchInput } from "@/components";
import dayjs from "dayjs";
import moment from "moment";
import DayPriceChart from "./dayPriceChart";
import WeekPriceChart from "./weekPriceChart";
import { InboxOutlined } from '@ant-design/icons';

const { Title } = Typography;

const History = () => {
    const [marketNameList, setMarketNameList] = useState([
        {name: '华东现货交易市场', code: 'A'},
        {name: '华南现货交易市场', code: 'B'}
    ])
    const [nodeTypeList, setNodeTypeList] = useState([
        {name: '模拟市场通用节点', code: 'A'}
    ])

    const [weekShowTypeList, setWeekShowTypeList] = useState([
        {name: '日前市场', code: 'A'}
    ])

    const [open, setOpen] = useState(false);

    const [date, setDate] = useState(dayjs(moment().subtract(2, 'days').format("YYYY-MM-DD")));
    const [date2, setDate2] = useState([dayjs(moment().subtract(9, 'days')), dayjs(moment().subtract(2, 'days'))])

    return (
        <div>
            <Row justify="end">
                <Button type="primary" onClick={()=>setOpen(true)}>上传电价数据</Button>
            </Row>
            <Card style={{ marginTop: 20}}>
                <Title level={3} style={{ marginTop: 0, marginBottom: 15, display: 'block' }}>单日交易数据</Title>
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
                    <div>
                        <span>查询时间：</span>
                        <DatePicker defaultValue={date} />
                    </div>
                    <Button type="primary">搜索</Button>
                    <Button>重置</Button>
                </Space>
                <div style={{marginTop: 20}}>
                    <DayPriceChart />
                </div>
            </Card>
            <Card style={{ marginTop: 20}}>
                <Title level={3} style={{ marginTop: 0, marginBottom: 15, display: 'block' }}>近一周价格走势</Title>
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
                    <div>
                        <span>查询时间：</span>
                        <DatePicker.RangePicker defaultValue={date2} />
                    </div>
                    <SearchInput
                        label="展示类型"
                        type="select"
                        options={weekShowTypeList}
                        value={"A"}
                    />
                    <Button type="primary">搜索</Button>
                    <Button>重置</Button>
                </Space>
                <div style={{marginTop: 20}}>
                    <WeekPriceChart />
                </div>
            </Card>
            <Modal
                title="上传电价数据"
                open={open}
                onCancel={()=>setOpen(false)}
                onOk={()=>setOpen(false)}
                okText="确定"
                cancelText="取消"
                width={800}
            >    
                <div style={{margin: '30px 0'}}>
                    <Upload.Dragger>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                        <p>支持excel文件格式，支持当个文件或者多个文件上传</p>
                    </Upload.Dragger>
                </div>
            </Modal>
        </div>
    )
}

export default History;