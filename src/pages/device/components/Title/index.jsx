import { theme as antdTheme } from "antd";
import { useSelector } from "umi";
import { PUBLIC_FILE_PATH } from "@/utils/constants";
import styles from "./index.less";

const Title = ({title}) => {
    const { theme } = useSelector(state => state.global);
    const { token } = antdTheme.useToken();
    return (
        <div 
            className={styles.title}
            style={{
                color: token.color5,
                background:`url("${theme==="default"? `${PUBLIC_FILE_PATH}/title_bg.svg`: `${PUBLIC_FILE_PATH}/title_white_bg.svg`}") left center no-repeat`
            }}
        >
            <span>{title}</span>
        </div>
    )
}

export default Title;