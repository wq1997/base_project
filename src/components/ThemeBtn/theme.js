

const theme = {
    dark: {
        colorPrimary: '#197AD8',
        colorPrimaryR:'rgba(3,180,180,1)',
        colorBgContainer:'rgba(0,0,0,0)',
        colorBorder:'#FFFFFF',
        colorTextPlaceholder:'#D8D8D8',
        colorIcon:'rgba(255, 255, 255, 0.45)',
        titleColor:'#FFFFFF',
        smallTitleColor:'#D8D8D8',
        defaultBg:'#ED750E',//默认类型按钮背景色
        bgcColorB_l:'linear-gradient(135deg, #00395A 0%, #0F2F56 100%)',//深到浅渐变（侧导航和头部背景色）
        bgcColorB_r: 'linear-gradient(135deg, #00395A 0%, #0F2F56 100%)',
        bgcColorl_B:'linear-gradient(135deg, #00395A 0%, #0F2F56 100%)',//浅到深渐变（内容模块背景色）
        sub_innerBgc:'',//侧导航二级导航背景色
        cardBgc:'#212849',
        cardShadow:'0px 2px 4px 0px rgba(6,7,16,0.5)',
        titleCardBgc:'#074267',//CardModle的背景色
        areaCardBgc: '#0E4C73',
        tableHead:'#20284D',//滚动表头颜色
        barColor:['#03B4B4','#A3BCE7','#FCF1AF','#77E2AA','#FFCE8F','#59C0E9'],
        treeBgb:'#03081D',
        lightTreeBgc:'#212849 ',
        lightTreeLineBgc:'#333F62',
        contentBgc:'#111838',
        darkbgc:'#0C122E',
        chartLineColor:['#03B4B4','#ED750E','#A97DFF','#4D4DF4','#EE3059','#2DD51E','#F4D81B','#4D4DF4'],
        color1: 'white',
        color2: '#197ad854',
        color3: 'white',
        color4: 'rgba(11,56,88,0.85)',
        color5: 'white',
        color6: 'white',
        color7: '#0b3858cc',
        color8: '#0F293B',
        color9: '#39587D',
        color10: 'white',
        color11: '#00516F',
        color12: 'black',
        color13: '#125686',
        color14: 'radial-gradient(153% 66% at 50% 50%, #072F4C 0%, #04719C 100%)',
        color15: '#0F446A',
        color16: '#175785',
        color17: '#BBDFFF',
        color18: '#0A1328',
        color19: '#2C638F',
        color20: '#ffffff33',
        color21: 'linear-gradient(135deg, rgb(0, 57, 90) 0%, rgb(15, 47, 86) 100%)',
        color22: '#074267',
        color23: 'linear-gradient(180deg, #00192E 0%, #00152B 57%, #0D2C4F 100%)',
        color24: '#244A75',
        color25: 'white',
        color26: 'white',
        color27: '#A4BAC8',
        color28: 'white',
        color29: 'linear-gradient(135deg, rgb(0, 57, 90) 0%, rgb(15, 47, 86) 100%)',
        color30: 'linear-gradient(rgba(21, 171, 219, 0.4) 0%, rgba(9, 114, 180, 0) 100%)',
        color31: '#0A436B',
        color32: 'white',
        components: {
            Modal: {
                contentBg: '#0D4D77',
                headerBg: '#0D4D77'
            },
            Cascader: {
                optionSelectedBg: '#0D4D77',
            },
            Table: {
                headerBg: '#0A4A74'
            },
            Tooltip: {
                colorBgSpotlight: 'black',
                colorText: '#FFF',
                colorTextLightSolid: '#FFF'
            }
        }
    },
    default: {
        colorPrimary:'#197AD8',
        colorPrimaryR:'rgba(3,180,180,1)',
        colorBgContainer:'#FFFFFF',
        colorBorder:'#d9d9d9',
        colorTextPlaceholder:'rgba(0, 0, 0, 0.25)',
        colorIcon:'rgba(0, 0, 0, 0.45)',
        titleColor:'#333333',
        smallTitleColor:'#333333',
        defaultBg:'#ED750E',
        bgcColorB_l:'linear-gradient( 90deg, #E8F9FF 0%, #FFFFFF 100%)',
        bgcColorB_r: 'linear-gradient( 180deg, #E8F9FF 0%, #FFFFFF 100%)',
        bgcColorl_B:'rgb(247, 253, 255)',
        sub_innerBgc:'rgba(246, 246, 248, 0.38)',
        cardBgc:'rgba(255,255,255,1)',
        cardShadow:'0px 2px 4px 0px rgba(224, 224, 224, 0.5)',
        titleCardBgc:'#fff',
        tableHead:'#E4E7F1',
        barColor:['#03B4B4','#A3BCE7','#FCF1AF','#77E2AA','#FFCE8F','#59C0E9'],
        treeBgb:'#E9EBF3',
        lightTreeBgc:'#F2F4F9',
        lightTreeLineBgc:'#E6E9F2',
        contentBgc:'#111838',
        darkbgc:'#0C122E',
        chartLineColor:['#03B4B4','#ED750E','#A97DFF','#4D4DF4','#EE3059','#2DD51E','#F4D81B','#4D4DF4'],
        color1: '#197AD8',
        color2: '#DDDDDD',
        color3: '#333333',
        color4: 'rgba(255,255,255,0.85)',
        color5: '#333333',
        color6: '#666666',
        color7: 'rgb(247, 253, 255, .8)',
        color8: '#f7fdff',
        color9: '#CEE4FF',
        color10: '#999999',
        color11: 'rgba(25,122,216,0.35)',
        color12: 'white',
        color13: '#CFF2FF',
        color14: 'radial-gradient(245% 72% at 50% 50%, #E8F9FF 0%, #B7E8FB 100%)',
        color15: 'white',
        color16: '#E4F4FF',
        color17: '#7093B1',
        color18: 'white',
        color19: 'linear-gradient(90deg, #C4D4DC 0%, #95BACC 100%)',
        color20: '#99999933',
        color21: '#EEFAFF',
        color22: '#f3fcff',
        color23: '#f3fcff',
        color24: '#CBE1ED',
        color25: '#2193C3',
        color26: '#197AD8',
        color27: '#666666',
        color28: 'rgba(0, 0, 0, 0.6)',
        color29: 'white',
        color30: 'linear-gradient(#59d7ff66 0%, #e3f4fd00 100%)',
        color31: '#D8D8D8',
        color32: 'black',
        components: {
            Modal: {
                contentBg: '#FFFFFF',
                headerBg: '#FFFFFF'
            },
            Cascader: {
                optionSelectedBg: '#e8f9ff',
            },
            Table: {
                headerBg: '#E5F7FF',
            },
            Tooltip: {
                colorBgSpotlight: '#FFFFFF',
                colorText: '#666',
                colorTextLightSolid: '#666'
            }
        }
    }
}
export default theme;