
import styles from "./index.less";
import ballImg from "../../../../assets/imges/ball.gif";
import { useIntl } from "umi";
import { theme,  } from "antd";

const DeviceRunDesc = ({dataSource}) => {
    const intl = useIntl();
    const { token } = theme.useToken();

    return (
        <div className={styles.circle}>
            {/* 正常 */}
            <div className={styles.ball1}>
                <div className={styles.data1} style={{color: '#01FF23'}}>{dataSource?.onlineCount||0}</div>
                <div className={styles.font} style={{color:token.tableColor}}>{intl.formatMessage({id: '在线'})}</div>
                <img src={ballImg} />
            </div>

            {/* 离线 */}
            <div className={styles.ball3}>
                <div className={styles.data3} style={{color: token.color6}}>{dataSource?.offlineCount||0}</div>
                <div className={styles.font} style={{color:token.tableColor}}>{intl.formatMessage({id: '离线'})}</div>
                <img src={ballImg} />
            </div>

            {/* 告警 */}
            <div className={styles.ball2}>
                <div className={styles.data2} style={{color: '#FF0000'}}>{dataSource?.nowAlarmCount||0}</div>
                <div className={styles.font} style={{color:token.tableColor}}>{intl.formatMessage({id: '告警'})}</div>
                <img src={ballImg} />
            </div>
        </div>
    )
}

export default DeviceRunDesc;