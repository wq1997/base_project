import { Helmet } from 'react-helmet';
import { theme } from 'antd';
import { PageTitle } from "@/components";
import styles from "./index.less";

const InvestmentResult = () => {
    const { token } = theme.useToken();
    return (
        <div
            style={{
                width: '100%',
                height: 'calc(100vh)'
            }}
            className={styles.investmentResult}
        >
            <div style={{padding: '24px 16px'}}>
                <Helmet><title>测算结果</title></Helmet>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="测算结果" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <div className={styles.resultList}>
                    <div className={styles.resultListItem}>全生命周期收益</div>
                    <div className={styles.resultListItem}>1</div>
                    <div className={styles.resultListItem}>全生命周期收益</div>
                    <div className={styles.resultListItem}>1</div>
                    <div className={styles.resultListItem}>全生命周期收益</div>
                    <div className={styles.resultListItem}>1</div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="收益估值" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <div className={styles.estimateData}>
                    <div className={styles.estimateDataItem}>测算周期 20年</div>
                    <div className={styles.estimateDataItem}>年运营天数 330天</div>
                </div>
                <div className={styles.estimateResult}>
                    <div className={styles.estimateResultItem}>年数</div>
                    <div className={styles.estimateResultItem}>总收益</div>
                </div>
            </div>
        </div>
    )
}

export default InvestmentResult;