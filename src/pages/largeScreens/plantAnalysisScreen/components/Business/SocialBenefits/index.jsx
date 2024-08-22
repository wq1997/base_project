import { Tooltip } from "antd";
import styles from "./index.less";

const SocialBenefits = ({ data }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "8px",
            }}
        >
            {data?.map(item => {
                return (
                    <div style={{ flex: 1, width: 0 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "center",
                                margin: "15px 0",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    color: "#FFFFFF",
                                    fontSize: 16,
                                    fontFamily: "DingTalkJinBuTi",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                }}
                            >
                                <Tooltip title={((item?.data || 0) / 10000).toFixed(2)}>
                                    <div
                                        className={styles.data}
                                        style={{
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            color: "#01fff5",
                                        }}
                                    >
                                        {((item?.data || 0) / 10000).toFixed(2)}
                                    </div>
                                </Tooltip>
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: "#fff",
                                        marginLeft: 2,
                                        position: "relative",
                                        top: -2,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item?.unit}
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <img
                                className={styles.pic}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginBottom: "10px",
                                }}
                                src={item?.icon}
                            />
                        </div>
                        <div
                            className={styles.label}
                            style={{ display: "flex", justifyContent: "center", color: "#FFFFFF" }}
                        >
                            {item?.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SocialBenefits;
