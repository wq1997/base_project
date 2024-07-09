// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme, Switch, Select, Descriptions } from "antd";
import { CardModel } from "@/components";
import { useSelector, useIntl } from "umi";
import Transformer from '../../../assets/svg/121.svg'
import { getCircuitDiagram, } from '@/services/plant'

function Com(props) {
    const [data, setData] = useState([])
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        let { data } = await getCircuitDiagram({ plantId: localStorage.getItem('plantId') });
        setData(data?.data)
    }
    return (
        <div className={styles.WiringDiagram}  >
            <CardModel
                title={t('接线图')}
                content={
                    <div className={styles.wrap} style={{ borderTop: `3px solid ${token.colorLittle}` }}>
                        <div className={styles.left} style={{ width: '80%' }}>
                            <div className={styles.theFirstLine} style={{ borderBottom: `3px solid ${token.colorLittle}` }}></div>
                            <div className={styles.theFirstContent}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((it, index) => {
                                    return (
                                        <div className={styles.module}>
                                            <div className={styles.dataLeft}>
                                                <div className={styles.pcsData}>
                                                    <div>I(A)</div>
                                                    <div>U(V)</div>
                                                    <div>P(kW)</div>
                                                </div>
                                                <div className={styles.bmsData}>
                                                    <div>I(A)</div>
                                                    <div>U(V)</div>
                                                    <div>P(kW)</div>
                                                </div>
                                            </div>
                                            <div className={styles.centerModule}>
                                                <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                                <div className={styles.onePcs} style={{ border: `3px solid ${token.colorLittle}` }}>
                                                    <div style={{textAlign:'center'}}>{data?.[0]?.[index]?.pcsName}</div>
                                                    {/* <div>#{it}</div> */}
                                                </div>
                                                <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                                <div className={styles.oneBms} style={{ border: `3px solid ${token.colorLittle}` }}>
                                                <div style={{textAlign:'center'}}>{data?.[0]?.[index]?.bmsName}</div>

                                                </div>
                                            </div>
                                            <div className={styles.dataRight}>
                                                <div className={styles.pcsData}>
                                                    <div>{data?.[0]?.[index]?.pcsCur}</div>
                                                    <div>{data?.[0]?.[index]?.pcsVol}</div>
                                                    <div>{data?.[0]?.[index]?.pcsPower}</div>
                                                </div>
                                                <div className={styles.bmsData}>
                                                <div>{data?.[0]?.[index]?.bmsCur}</div>
                                                    <div>{data?.[0]?.[index]?.bmsVol}</div>
                                                    <div>{data?.[0]?.[index]?.bmsPower}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.theFirstLine} style={{ borderBottom: `3px solid ${token.colorLittle}` }}></div>
                            <div className={styles.theFirstContent}>
                               {[1, 2, 3, 4, 5, 6, 7, 8].map((it, index) => {
                                    return (
                                        <div className={styles.module}>
                                            <div className={styles.dataLeft}>
                                                <div className={styles.pcsData}>
                                                    <div>I(A)</div>
                                                    <div>U(V)</div>
                                                    <div>P(kW)</div>
                                                </div>
                                                <div className={styles.bmsData}>
                                                    <div>I(A)</div>
                                                    <div>U(V)</div>
                                                    <div>P(kW)</div>
                                                </div>
                                            </div>
                                            <div className={styles.centerModule}>
                                                <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                                <div className={styles.onePcs} style={{ border: `3px solid ${token.colorLittle}` }}>
                                                    <div style={{textAlign:'center'}}>{data?.[1]?.[index]?.pcsName}</div>
                                                    {/* <div>#{it}</div> */}
                                                </div>
                                                <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                                <div className={styles.oneBms} style={{ border: `3px solid ${token.colorLittle}` }}>
                                                <div style={{textAlign:'center'}}>{data?.[1]?.[index]?.bmsName}</div>

                                                </div>
                                            </div>
                                            <div className={styles.dataRight}>
                                                <div className={styles.pcsData}>
                                                    <div>{data?.[1]?.[index]?.pcsCur}</div>
                                                    <div>{data?.[1]?.[index]?.pcsVol}</div>
                                                    <div>{data?.[1]?.[index]?.pcsPower}</div>
                                                </div>
                                                <div className={styles.bmsData}>
                                                <div>{data?.[1]?.[index]?.bmsCur}</div>
                                                    <div>{data?.[1]?.[index]?.bmsVol}</div>
                                                    <div>{data?.[1]?.[index]?.bmsPower}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.theFirstLine} style={{ borderBottom: `3px solid ${token.colorLittle}` }}></div>
                            <div className={styles.theFirstContent}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((it,index) => {
                                   return (
                                    <div className={styles.module}>
                                        <div className={styles.dataLeft}>
                                            <div className={styles.pcsData}>
                                                <div>I(A)</div>
                                                <div>U(V)</div>
                                                <div>P(kW)</div>
                                            </div>
                                            <div className={styles.bmsData}>
                                                <div>I(A)</div>
                                                <div>U(V)</div>
                                                <div>P(kW)</div>
                                            </div>
                                        </div>
                                        <div className={styles.centerModule}>
                                            <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                            <div className={styles.onePcs} style={{ border: `3px solid ${token.colorLittle}` }}>
                                                <div style={{textAlign:'center'}}>{data?.[2]?.[index]?.pcsName}</div>
                                                {/* <div>#{it}</div> */}
                                            </div>
                                            <div className={styles.line} style={{ borderRight: `3px solid ${token.colorLittle}` }}></div>
                                            <div className={styles.oneBms} style={{ border: `3px solid ${token.colorLittle}` }}>
                                            <div style={{textAlign:'center'}}>{data?.[2]?.[index]?.bmsName}</div>

                                            </div>
                                        </div>
                                        <div className={styles.dataRight}>
                                            <div className={styles.pcsData}>
                                                <div>{data?.[2]?.[index]?.pcsCur}</div>
                                                <div>{data?.[2]?.[index]?.pcsVol}</div>
                                                <div>{data?.[2]?.[index]?.pcsPower}</div>
                                            </div>
                                            <div className={styles.bmsData}>
                                            <div>{data?.[2]?.[index]?.bmsCur}</div>
                                                <div>{data?.[2]?.[index]?.bmsVol}</div>
                                                <div>{data?.[2]?.[index]?.bmsPower}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                        <div className={styles.right} style={{ width: 'calc(20% - 62.5px)', marginLeft: '60px' }}>
                            <div style={{ display: 'flex', height: '8vh', minHeight: '70px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ width: 'calc(20px + 1.5px)', height: 'calc(50% - 28.5px)', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                    <img src={Transformer} alt="" style={{ width: '40px', height: '60px' }} />
                                    <div style={{ width: 'calc(20px + 1.5px)', height: 'calc(50% - 28.5px)', borderRight: `3px solid ${token.colorLittle}`, borderBottom: `3px solid ${token.colorLittle}` }}></div>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div style={{ width: 'calc(1.5px + 100%)', height: '8vh', minHeight: '70px', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div style={{ width: 'calc(21.5px + 100%)', height: '8vh', minHeight: '70px', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                </div>

                            </div>
                            <div style={{ display: 'flex', height: 'calc(8vh + 220px)', minHeight: '290px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                    <div style={{ width: 'calc(20px + 1.5px + 100%)', height: 'calc(50% - 30px)', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                    <img src={Transformer} alt="" style={{ width: '40px', height: '60px', marginLeft: 'calc(100%)' }} />
                                    <div style={{ width: 'calc(20px + 1.5px + 100%)', height: 'calc(50% - 28.5px)', borderRight: `3px solid ${token.colorLittle}`, borderBottom: `3px solid ${token.colorLittle}` }}></div>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div style={{ width: 'calc(21.5px + 100%)', height: 'calc(8vh + 220px)', minHeight: '290px', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', height: 'calc(8vh + 220px)', minHeight: '290px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                    <div style={{ width: 'calc(20px + 1.5px + 100%)', height: 'calc(50% - 30px)', borderRight: `3px solid ${token.colorLittle}` }}></div>
                                    <img src={Transformer} alt="" style={{ width: '40px', height: '60px', marginLeft: '100%' }} />
                                    <div style={{ width: 'calc(20px + 1.5px + 100%)', height: 'calc(50% - 28.5px)', borderRight: `3px solid ${token.colorLittle}`, borderBottom: `3px solid ${token.colorLittle}` }}></div>
                                </div>
                            </div>
                        </div>


                    </div>
                }
            />

        </div>
    )
}

export default Com