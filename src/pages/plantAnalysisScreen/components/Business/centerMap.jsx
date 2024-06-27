const CenterMap = ({ dataSource }) => {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative", display: 'flex', gap: 4 }}>
            {dataSource?.map(data => {
                return (
                    <div
                        style={{
                            flex: 1,
                            height: '100%',
                            border: '1px solid',
                            borderImage: 'linear-gradient(180deg, rgba(84, 207, 255, 1), rgba(8, 57, 85, 1), rgba(128, 183, 242, 1), rgba(12, 65, 94, 1), rgba(117, 180, 255, 1)) 1 1',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "40px 0",
                            boxSizing: "border-box",
                            borderRadius: 10
                        }}
                    >
                        <img src={data?.icon} style={{ width: "30%", marginRight: 15 }} />
                        <div>
                            <div
                                style={{
                                    color: '#54D1FF',
                                    fontFamily: "DingTalkJinBuTi",
                                    fontSize: 28,
                                }}
                            >
                                {data?.data}
                            </div>
                            <div style={{ color: "white", marginTop: 5, fontSize: 16 }}>{data?.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CenterMap;
