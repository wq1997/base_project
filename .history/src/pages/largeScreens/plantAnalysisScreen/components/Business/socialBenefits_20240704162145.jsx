const SocialBenefits = ({ data }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            {data?.map(item => {
                return (
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <img
                                style={{
                                    width: "30%",
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
                                    flex:1,
                                    color: "#FFFFFF",
                                    fontSize: 25,
                                    fontFamily: "DingTalkJinBuTi",
                                    overflow:'hidden',
                                    white-space: 'nowrap',
                                    text-overflow: 'ellipsis';
                                }}
                            >
                                {item?.data}
                            </span>
                            <span style={{ color: "#999", marginLeft: 2 }}>{item?.unit}</span>
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
