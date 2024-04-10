const theme = {
    dark: {
        colorPrimary: "#384FE8",
        layoutTopBackColor: "#00254A !important",
        layoutLeftBackColor: "#00254A !important",
        incomeOverviewCardColor:
            "linear-gradient( 360deg, rgba(1,12,30,0) 0%, #07162F 100%) !important",
        color1: "#FFF",
        components: {
            Modal: {
                contentBg: "#0A182E",
                footerBg: "#0A182E",
                headerBg: "#0A182E",
            },
            Button: {
                defaultBg: "none",
            },
            Table: {
                headerBg: "#05305C",
            },
        },
    },
    default: {
        colorPrimary: "#384EE8",
        layoutTopBackColor: "linear-gradient( 90deg, #E9EFFB 0%, #FFFFFF 100%) !important",
        layoutLeftBackColor: "linear-gradient( 180deg, #E9EFFB 0%, #FFFFFF 100%) !important",
        incomeOverviewCardColor:
            "linear-gradient(360deg, rgba(248,251,255,0.5) 0%, #F8FBFF 100%, #F8FBFF 100%) !important",
        color1: "#FFF",
        components: {
            Modal: {
                contentBg: "white",
                footerBg: "white",
                headerBg: "white",
            },
            Button: {
                defaultBg: "none",
            },
            Table: {
                headerBg: "#F6F8FD",
            },
        },
    },
};
export default theme;
