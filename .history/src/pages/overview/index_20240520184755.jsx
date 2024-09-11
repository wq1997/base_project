import { Tabs } from "antd";
import styles from "./index.less";

const Index = () => {
    return (
        <div className={styles.container}>
            <div className="left"></div>
            <div className="rigth">
                <div className="top">
                    <div className="r-left"></div>
                    <div className="r-left"></div> <div className="r-right"></div>
                </div>

                <div className="bottom"></div>
            </div>
        </div>
    );
};

export default Index;
