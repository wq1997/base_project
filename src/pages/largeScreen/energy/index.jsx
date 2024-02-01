import Layout from "../components/Layout";
import Box from "../components/box";
import ElectricityStatistics from "./ElectricityStatistics";
import ChargeDischarge from "./ChargeDischarge";
import RealtimeAlarm from "./RealtimeAlarm";
import PowerCurve from "./PowerCurve";
import RealtimeIncome from "./RealtimeIncome";
import Device from "./Device";
import styles from "./index.less";

const Energy = () => {
    return (
        <Layout title="采日能源储能管理系统">
            <div className={styles.energy}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Box title="电量统计" icon="icon-biaotitishi">
                            <ElectricityStatistics />
                        </Box>
                        <Box title="近七日充放电电量" icon="icon-biaotitishi">
                            <ChargeDischarge/>
                        </Box>
                    </div>
                    <div className={styles.topRight}>
                        <Box title="电站设备统计" icon="icon-biaotitishi">
                            <Device />
                        </Box>
                        <Box title="实时收益" icon="icon-biaotitishi">
                            <RealtimeIncome />
                        </Box>
                        <Box title="功率曲线" icon="icon-biaotitishi">
                            <PowerCurve />
                        </Box>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Box title="实时告警" icon="icon-biaotitishi">
                        <RealtimeAlarm />
                    </Box>
                </div>
            </div>
        </Layout>
    )
}

export default Energy;