import Layout from "../components/Layout";
import Box from "../components/box";
import Electricity from "./Electricity";
import ElectricityStatistics from "./ElectricityStatistics";
import IncomeStatistics from "./IncomeStatistics";
import RealtimeIncome from "./RealtimeIncome";
import Efficiency from "./Efficiency";
import PowerCurve from "./PowerCurve";
import styles from "./index.less";

const Microgrids = ({onChange}) => {
    const Content = ({plantId}) => {
        return (
            <div className={styles.microgrids}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Box title="电量" icon="icon-biaotitishi">
                            <Electricity plantId={plantId}/>
                        </Box>
                        <Box title="电量统计(近7日)" icon="icon-biaotitishi">
                            <ElectricityStatistics plantId={plantId} />
                        </Box>
                    </div>
                    <div className={styles.topRight}>
                        <Box title="效率" icon="icon-biaotitishi">
                            <Efficiency plantId={plantId} />
                        </Box>
                        <Box title="实时收益" icon="icon-biaotitishi">
                            <RealtimeIncome plantId={plantId} />
                        </Box>
                        <Box title="收益统计(近7日)" icon="icon-biaotitishi">
                            <IncomeStatistics plantId={plantId} />
                        </Box>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Box title="功率曲线" icon="icon-biaotitishi">
                        <PowerCurve plantId={plantId} />
                    </Box>
                </div>
            </div>
        )
    }
    return (
        <Layout title="采日能源微网管理系统" onChange={onChange}>
            <Content />
        </Layout>
    )
}

export default Microgrids;