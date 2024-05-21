import Layout from "../components/Layout";
import Box from "../components/box";
import ElectricityStatistics from "./ElectricityStatistics";
import ChargeDischarge from "./ChargeDischarge";
import RealtimeAlarm from "./RealtimeAlarm";
import PowerCurve from "./PowerCurve";
import RealtimeIncome from "./RealtimeIncome";
import Device from "./Device";
import styles from "./index.less";

const Energy = ({plantId, onChange}) => {
    
    return (
        <Layout title="采日能源储能管理系统" plantId={plantId} onChange={onChange}>
            <div className={styles.energy}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Box title="电量统计" icon="icon-biaotitishi">
                            <ElectricityStatistics plantId={plantId} />
                        </Box>
                        <Box title="近七日充放电电量" icon="icon-biaotitishi">
                            <ChargeDischarge plantId={plantId}/>
                        </Box>
                    </div>
                    <div className={styles.topRight}>
                        <Box title="电站设备统计" icon="icon-biaotitishi">
                            <Device plantId={plantId}/>
                        </Box>
                        <Box title="实时收益" icon="icon-biaotitishi">
                            <RealtimeIncome plantId={plantId}/>
                        </Box>
                        <Box title="功率曲线" icon="icon-biaotitishi">
                            <PowerCurve plantId={plantId}/>
                        </Box>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Box title="实时告警" icon="icon-biaotitishi">
                        <RealtimeAlarm plantId={plantId}/>
                    </Box>
                </div>
            </div>
        </Layout>
    )
}

export default Energy;