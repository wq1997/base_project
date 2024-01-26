import Layout from "../components/Layout";
import Box from "../components/box";
import styles from "./index.less";

const Energy = () => {
    return (
        <Layout title="采日能源储能管理系统">
            <div className={styles.energy}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Box />
                        <Box />
                    </div>
                    <div className={styles.topRight}>
                        <Box />
                        <Box />
                        <Box />
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Box />
                </div>
            </div>
        </Layout>
    )
}

export default Energy;