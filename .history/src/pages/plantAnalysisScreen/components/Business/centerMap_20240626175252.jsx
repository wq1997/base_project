import Map from "./map";
const CenterMap = ({ dataSource }) => {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
                style={{
                    width: "100%",
                    height: "100px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    gap: 8,
                    zIndex: 99,
                }}
            >
                {dataSource?.map(data => {
                    return (
                        <div
                            style={{
                                width: "100%",
                                background: `transparent url(/images/center.svg) center center no-repeat`,
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px 20px",
                                boxSizing: "border-box",
                            }}
                        >
                            <img src={data?.icon} style={{ width: "30%", marginRight: 15 }} />
                            <div>
                                <div
                                    style={{
                                        color: data?.fontColor,
                                        fontFamily: "DingTalkJinBuTi",
                                        fontSize: 30,
                                    }}
                                >
                                    {data?.data}
                                </div>
                                <div style={{ color: "white", marginTop: 5 }}>{data?.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ width: "100%", height: "100%" }}>
                <Map
                    plants={[
                        { plantName: "上海采日能源电站", position: [121.320789, 31.194111] },
                        { plantName: "杭州采日能源电站", position: [120.212851, 30.291667] },
                        { plantName: "南京采日能源电站", position: [118.798196, 31.968232] },
                        { plantName: "合肥采日能源电站", position: [117.290268, 31.798907] },
                        {
                            plantName: "重庆北站重庆北站重庆北站重庆北站重庆北站重庆北站重庆北站",
                            position: [106.55081, 29.609201],
                        },
                        { plantName: "广州南站", position: [113.26932, 22.9885] },
                    ]}
                />
            </div>
        </div>
    );
};

export default CenterMap;
