import { Charts3D, Charts2_5D, ScrollTable } from "@/components";
import Title from "../Title";
import styles from "./index.less";
import Map from "@/pages/largeScreens/components/map";

const Network = () => {
    return (
        <div className={styles.container}>
            <div className={styles.area1}>
                <Title title={"电站概览"}/>
                <div className={styles.areaContent}>
                    <div className={styles.area1Content}>
                        <div className={styles.top}>
                            <div className={styles.data}>
                                <span className={styles.label}>总装机容量：</span>
                                <span className={styles.value}>XXXXXXXXX</span>
                            </div>
                            <div className={styles.chart}>
                                <Charts3D 
                                    colorList={['#17A6FF', '#FF63DD', '#FFCD18', '#61F671', '#07FCDD', '#5B5EF7']}
                                    data={[
                                        {
                                            name: 'PM2.5',
                                            value: 134,
                                        },
                                        {
                                            name: 'VOC',
                                            value: 56,
                                        },
                                        {
                                            name: 'T',
                                            value: 57,
                                        },
                                        {
                                            name: 'CH2O',
                                            value: 36,
                                        }
                                    ]}
                                    autoRotate={false}
                                    showLengend={true}
                                />
                                <Charts3D 
                                    colorList={['#00F9FF', '#FFF100']}
                                    data={[
                                        {
                                            name: '源侧',
                                            value: 134,
                                        },
                                        {
                                            name: '网侧',
                                            value: 56,
                                        },
                                    ]}
                                    autoRotate={false}
                                    showLengend={true}
                                />
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.data}>
                                <span className={styles.label}>总电站个数：</span>
                                <span className={styles.value}>XXXXXXXXX</span>
                            </div>
                            <div className={styles.chart}>
                                <Charts3D 
                                    colorList={['#17A6FF', '#FF63DD', '#FFCD18', '#61F671', '#07FCDD', '#5B5EF7']}
                                    data={[
                                        {
                                            name: 'PM2.5',
                                            value: 134,
                                        },
                                        {
                                            name: 'VOC',
                                            value: 56,
                                        },
                                        {
                                            name: 'T',
                                            value: 57,
                                        },
                                        {
                                            name: 'CH2O',
                                            value: 36,
                                        }
                                    ]}
                                    autoRotate={false}
                                    showLengend={true}
                                />
                                <Charts3D 
                                    colorList={['#00F9FF', '#FFF100']}
                                    data={[
                                        {
                                            name: '源侧',
                                            value: 134,
                                        },
                                        {
                                            name: '网侧',
                                            value: 56,
                                        },
                                    ]}
                                    autoRotate={false}
                                    showLengend={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.area2}></div>
            <div className={styles.area3}>
                <Title title={"项目列表"}/>
                <div className={styles.areaContent}>
                    <ScrollTable 
                        columns={[
                            {
                                title: '项目名称',
                                key: '1'
                            },
                            {
                                title: '项目类型',
                                key: '2'
                            },
                            {
                                title: '项目地址',
                                key: '3'
                            },
                        ]}
                        dataSource={[1,2,3,4,5]?.map(item => {
                            return {
                                1: '一级',
                                2: '普通',
                                3: '宁夏回族自治区灵武市宁东镇狼南线国能宁东',
                            }
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Network;