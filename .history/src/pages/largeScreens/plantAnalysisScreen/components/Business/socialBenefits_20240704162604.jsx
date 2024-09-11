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
                    <div style={{ flex: 1 }}>
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
                            <span
                                style={{
                                    flex: 1,
                                    width: 0,
                                    color: "#FFFFFF",
                                    fontSize: 25,
                                    fontFamily: "DingTalkJinBuTi",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {item?.data}
                                <span style={{ color: "#999", marginLeft: 2 }}>{item?.unit}</span>
                            </span>
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
