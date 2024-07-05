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
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <img
                                className={styles.pic}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                }}
                                src={item?.icon}
                            />
                        </div>
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
                                <div
                                    className={styles.data}
                                    style={{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {item?.data}
                                </div>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: "#999",
                                        marginLeft: 2,
                                        position: "relative",
                                        top: -2,
                                    }}
                                >
                                    {item?.unit}
                                </span>
                            </div>
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
