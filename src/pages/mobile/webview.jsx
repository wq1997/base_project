import { useSearchParams } from "umi";
import styles from "./index.less";

const Webview = () => {
    const [searchParams] = useSearchParams();
    const url = searchParams.get('url');

    return (
        <iframe src={"https://m.chu21.com/html/chunengy-26271.shtml"} className={styles.iframePage} />
    )
}

export default Webview