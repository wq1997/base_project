const theme = {
    dark: {
        colorPrimary: '#49A2F8',
        headerBackground: '#1E3C53 !important',
        sideBackgroud: '#1E3C53 !important',
        overviewCardBg: '#1E3C53',
        contentBgColor: '#233542',
        contentInnerBgColor: '#1E3C53',
        overviewBgColor: '#233542',
        fontColor: '#F5F9FE',
        unitColor: '#999999',
        descriptionColor: '#CACACA',
        color1: '#FFFFFF',
        color2: 'rgb(87 122 156)',
        color3: '#01A5FF',
        color4: '#fff',
        color5: '#27475f',
        color6: '#DDE2E5',
        components: {
            Table:{
                headerBg: '#3C5E76',
                rowHoverBg: '#215D88',
                rowSelectedBg: '#215D88',
            },
            Modal: {
                contentBg: '#27475f',
                headerBg: '#27475f',
            },
            Input: {
                hoverBg: 'none',
                activeBg: 'none',
                colorBorder: 'rgba(255,255,255,0.3)',
            },
            DatePicker: {
                hoverBg: 'none',
                activeBg: 'none',
                colorBorder: 'rgba(255,255,255,0.3)',
            },
            Select: {
                hoverBg: 'none',
                activeBg: 'none',
                colorBorder: 'rgba(255,255,255,0.3)',
            },
            Button: {
                defaultBg: 'none',
                defaultHoverBg: 'none'
            },
            Drawer: {
                colorBgElevated: '#27475f'
            }
        }
    },
    default: {
        colorPrimary: '#1677ff',
        headerBackground: 'linear-gradient(96deg, #eaf5ff 0%, #f7fcff 100%) !important',
        sideBackgroud: 'linear-gradient(180deg, #eaf5ff 0%, #f7fcff 100%) !important',
        overviewCardBg: '#f5f9fe',
        contentBgColor: '#F5F5F5',
        contentInnerBgColor: 'white',
        overviewBgColor: 'white',
        fontColor: '#25598d',
        unitColor: '#25598d',
        descriptionColor: '#666',
        color1: '#333',
        color2: 'rgba(0, 0, 0, 0.15)',
        color3: '#1677ff',
        color4: 'rgba(0, 0, 0, 0.88)',
        color5: '#fff',
        color6: '#49A2F8',
        components: {
            Table:{
                headerBg: '#fafafa',
            }
        }
    }
}
export default theme;