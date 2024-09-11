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
                                    fontSize: 25,
                                    fontFamily: "DingTalkJinBuTi",
                                    display: "flex",
                                    alignItems: "flex-end",
                                }}
                            >
                                <div
                                    style={{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {item?.data}
                                </div>
                                <span style={{ fontSize: 14, color: "#999", marginLeft: 2,ma }}>
                                    {item?.unit}
                                </span>
                            </div>
                        </div>
                        <div
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
