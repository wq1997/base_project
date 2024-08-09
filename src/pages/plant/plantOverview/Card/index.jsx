import { theme } from "antd";
import styles from "./index.less";

const Index = ({ title, others, content }) => {
    const { token } = theme.useToken();

    return (
        <div className={styles.index} style={{backgroundColor: token.overviewCardBg}}>
            <div className={styles.header}>
                <span className={styles.title}>
                    <div className={styles.cicle}></div>
                    <span style={{color: token.color1}}>{title}</span>
                </span>
                {others}
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Index;
