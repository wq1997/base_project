import { theme } from "antd";
import styles from "./index.less";

const Title = ({title}) => {
    const { token } = theme.useToken();
    return (
        <div className={styles.title} style={{ color: token.titleColor }}>{title}</div>
    )
}

export default Title;