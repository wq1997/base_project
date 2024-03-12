import { Card, Typography, theme, Col, Row, Statistic, Divider } from "antd";
import styles from "./index.less";
import WeekReportChart from "./weekReportChart";
import WeekClearingChart from "./weekClearingChart";
import LiuchenSvg from "./liuchen.svg";

const HomePage = () => {
    const { token } = theme.useToken();
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                className={styles.top}
            >
                <div style={{width: 'calc(60% - 2px)', height: 500}}>
                    <Card style={{width: 'calc(100%)', height: '100%'}}>
                        <Typography.Title level={3} style={{ margin: 0, marginBottom: 20 }}>
                            业务流程导航
                        </Typography.Title>
                        <div 
                            style={{
                                height: 'calc(100% - 40px)'
                            }}
                        >
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }} 
                                src={LiuchenSvg} 
                            />
                        </div>
                    </Card>
                </div>
                <div style={{width: 'calc(40% - 2px)', height: 500}}>
                    <Card style={{width: 'calc(100%)', height: '100%'}}>
                        <Typography.Title level={3} style={{ margin: 0, marginBottom: 20 }}>
                            运营统计
                        </Typography.Title>
                        <div 
                            style={{
                                height: 'calc(100% - 40px)'
                            }}
                        >
                            <div 
                                style={{
                                    width: '100%',
                                    height: 30,
                                    borderRadius: 15,
                                    border: `1px solid ${token.colorPrimary}`,
                                    overflow: 'hidden',
                                    lineHeight: '30px',
                                    display: 'flex',
                                    marginTop: 40
                                }}
                            >
                                <div
                                    style={{
                                        width: '50%',
                                        height: 30,
                                        background: token.colorPrimary,
                                        color: 'white'
                                    }}
                                >
                                    <span style={{marginLeft: 40}}>累计收益</span>
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                        height: 30,
                                        color: token.colorPrimary,
                                        textAlign: 'right'
                                    }}
                                >
                                    <span style={{marginRight: 40, fontWeight: 800}}>307988 万元</span>
                                </div>
                            </div>
                            <div style={{margin: 40}}>
                                <Row gutter={16} style={{width: '100%'}} justify="center">
                                    <Col span={6}>
                                        <Statistic title="累计充电(MWh)" value={22853.6} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="充电费用(万元)" value={673.56} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="累计放电(MWh)" value={17204} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="放电费用(万元)" value={945.549} />
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Divider orientation="center">
                                    <Typography.Title level={5} style={{ margin: 0, textAlign: 'center' }}>
                                        日收益排行
                                    </Typography.Title>
                                </Divider>
                                <div style={{display: 'flex', marginBottom: 10, fontSize: 20, alignItems: 'center'}}>
                                    <div style={{flex: 1, textAlign: 'center'}}>1</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>2024-03-08</div>
                                    <div style={{flex: 1, textAlign: 'center', color: token.colorPrimary, fontSize: 25}}>5.542</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>万元</div>
                                </div>
                                <div style={{display: 'flex', marginBottom: 10, fontSize: 20, alignItems: 'center'}}>
                                    <div style={{flex: 1, textAlign: 'center'}}>2</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>2024-01-07</div>
                                    <div style={{flex: 1, textAlign: 'center', color: token.colorPrimary, fontSize: 25}}>4.576</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>万元</div>
                                </div>
                                <div style={{display: 'flex', fontSize: 20, alignItems: 'center'}}>
                                    <div style={{flex: 1, textAlign: 'center'}}>3</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>2023-12-18</div>
                                    <div style={{flex: 1, textAlign: 'center', color: token.colorPrimary, fontSize: 25}}>2.564</div>
                                    <div style={{flex: 1, textAlign: 'center'}}>万元</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 4
                }}
                className={styles.bottom}
            >
                <div style={{width: 'calc(50% - 2px)', height: 500}}>
                    <Card style={{width: 'calc(100%)', height: '100%'}}>
                        <Typography.Title level={3} style={{ margin: 0, marginBottom: 20 }}>
                            七日申报容量
                        </Typography.Title>
                        <div 
                            style={{
                                height: 'calc(100% - 40px)'
                            }}
                        >
                            <WeekReportChart />
                        </div>
                    </Card>
                </div>
                <div style={{width: 'calc(50% - 2px)', height: 500}}>
                    <Card style={{width: 'calc(100%)', height: '100%'}}>
                        <Typography.Title level={3} style={{ margin: 0, marginBottom: 20 }}>
                            七日出清电量
                        </Typography.Title>
                        <div 
                            style={{
                                height: 'calc(100% - 40px)'
                            }}
                        >
                            <WeekClearingChart />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default HomePage;