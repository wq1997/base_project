import { theme } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./index.less";
import classNames from "classnames";

const Title = ({ title, showVerticalLine=true }) => {
    const { token } = theme.useToken();

    const verticalLineStyle = useEmotionCss(({ token }) => {
        return {
            "&::before": {
                display: 'inline-block',
                content: '""',
                width: '8px',
                height: '24px',
                backgroundColor: 'rgba(3, 180, 180, 1)',
                borderRadius: '4px',
                verticalAlign: 'middle',
                marginRight: '8px'
            }
        }
    });

    return (
        <div
            className={classNames(styles.title, { [verticalLineStyle]: showVerticalLine })}
            style={{ color: token.titleColor }}
        >
            {title}
        </div>
    )
}

export default Title;