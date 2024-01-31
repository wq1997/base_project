import Layout from "../components/Layout";
import Box from "../components/box";
import Electricity from "./Electricity";
import ElectricityStatistics from "./ElectricityStatistics";
import IncomeStatistics from "./IncomeStatistics";
import RealtimeIncome from "./RealtimeIncome";
import Efficiency from "./Efficiency";
import styles from "./index.less";

const Microgrids = () => {
    return (
        <Layout title="采日能源微网管理系统">
            <div className={styles.microgrids}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Box title="电量" icon="icon-biaotitishi">
                            <Electricity />
                        </Box>
                        <Box title="电量统计(近7日)" icon="icon-biaotitishi">
                            <ElectricityStatistics />
                        </Box>
                    </div>
                    <div className={styles.topRight}>
                        <Box title="效率" icon="icon-biaotitishi">
                            <Efficiency />
                        </Box>
                        <Box title="实时收益" icon="icon-biaotitishi">
                            <RealtimeIncome />
                        </Box>
                        <Box title="收益统计(近7日)" icon="icon-biaotitishi">
                            <IncomeStatistics />
                        </Box>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Box title="功率曲线" icon="icon-biaotitishi">
                        
                    </Box>
                </div>
            </div>
        </Layout>
    )
}

export default Microgrids;