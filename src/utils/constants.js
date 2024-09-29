import { FormattedMessage } from 'umi'
import dayjs from 'dayjs';

export const DEFAULT_PAGINATION = { current: 1, pageSize: 10, total: 0, showQuickJumper: true };
export const FORM_REQUIRED_RULE = { required: true, message: <FormattedMessage id='请输入必填字段' /> };
export const FORM_FORBIDDEN_SPACE = { pattern: /^[^\s]*$/, message: '禁止输入空格' };
export const FORM_ONLY_NUMBER = { pattern: /^[1-9]\d*$/, message: '只能输入数字' };
export const TELPHONE_NUMBER_REG = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const ICON_PATH = "//at.alicdn.com/t/c/font_4191866_6iautgu0c8r.js";
export const PUBLIC_FILE_PATH = 'https://energy.sermatec-cloud.com/static/';
export const SYSTEM_NAME = '采日工商业微网孪生平台'
export const MAP_KEY = '2dca0cb2ced6ced6030c26376186faee';
export const WETHER_API = 'https://devapi.qweather.com/v7/weather/3d?';
export const AIR_API = 'https://devapi.qweather.com/v7/air/now?';
export const WETHER_KEY = '4e50b674eed8402c8a70c8155690a0e1';
export const alarmTableColums = [
    {
        title: <FormattedMessage id='设备类型' />,
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: <FormattedMessage id='告警等级' />,
        dataIndex: 'prior',
        key: 'prior',
        render: (val) => {
            if (val == 1) {
                return <div style={{ color: 'red' }}>
                    一级告警
                </div>
            } else if (val == 2) {
                return <div style={{ color: '#ED750E' }}>
                    二级告警
                </div>
            } else if (val == 3) {
                return <div style={{ color: 'orange' }}>
                    三级告警
                </div>
            } else if (val == 4) {
                return <div style={{ color: 'green' }}>
                    四级告警
                </div>
            }
        }
    },
    {
        title: <FormattedMessage id='告警描述' />,
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: <FormattedMessage id='设备名称' />,
        dataIndex: 'deviceName',
        key: 'deviceName',
    },
    {
        title: <FormattedMessage id='并网点' />,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: <FormattedMessage id='电站名称' />,
        dataIndex: 'plantName',
        key: 'plantName',
    },

    {
        title: <FormattedMessage id='开始时间' />,
        dataIndex: 'begin',
        key: 'begin',
        render: (val) => {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
    {
        title: <FormattedMessage id='结束时间' />,
        dataIndex: 'end',
        key: 'end',
        render: (val) => {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
];
export const RealtimeData = [];


export const profitTable = [
    {
        title: <FormattedMessage id='id' />,
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: <FormattedMessage id='日期' />,
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },
    {
        title: <FormattedMessage id='充电成本（元）' />,
        className: 'chargeProfit',
        children: [
            {
                title: <FormattedMessage id='尖电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='峰电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='平电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='谷电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='总计' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
        ],
    },
    {
        title: <FormattedMessage id='放电收益（元）' />,
        className: 'disChargeProfit',
        children: [
            {
                title: <FormattedMessage id='尖电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='峰电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='平电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='谷电' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },
            {
                title: <FormattedMessage id='总计' />,
                dataIndex: 'street',
                key: 'street',
                width: 150,
            },

        ],
    },
    {
        title: <FormattedMessage id='实际收益' />,
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },

];

export const timeZoneList = (function () {
    let list = [];
    Array.from({ length: 12 }).forEach((_, i) => {
        if (i !== 0) {
            list = [
                ...list,
                { label: `UTC+${i}`, value: `UTC+${i}` },
                { label: `UTC-${i}`, value: `UTC-${i}` },
            ];
        } else {
            list.push({ label: "UTC+0", value: "UTC+0" });
        }
    });
    return list;
})();

export const pcsDataType = [
    {
        value: 169,
        label: <FormattedMessage id='实时功率' />,
    },
    // {
    //     value:305,
    //     label:<FormattedMessage id='日充电量'/>,
    // },
    // {
    //     value:306 ,
    //     label:<FormattedMessage id='日放电量'/>,
    // },
];

export const BmsDataType = [
    {
        value: 181,
        label: <FormattedMessage id='电压' />,
        unit: "V"
    },
    {
        value: 182,
        label: <FormattedMessage id='电流' />,
        unit: "A"

    },
    {
        value: 183,
        label: <FormattedMessage id='SOC' />,
        unit: "%"

    },
    {
        value: 184,
        label: <FormattedMessage id='SOH' />,
        unit: "%"
    },
    //   {
    //     value:303,
    //     label:<FormattedMessage id='日充'/>,
    //     unit:"kWh"

    // },
    // {
    //     value:304,
    //     label:<FormattedMessage id='日放'/>,
    //     unit:"kWh"

    // },
];

export const BmcDataType = [
    {
        value: 192,
        label: <FormattedMessage id='电压' />,
        unit: "V"

    },
    {
        value: 193,
        label: <FormattedMessage id='电流' />,
        unit: "A"

    },
    {
        value: 187,
        label: <FormattedMessage id='SOC' />,
        unit: "%"

    },
    {
        value: 194,
        label: <FormattedMessage id='SOH' />,
        unit: "%"

    },
    {
        value: 307,
        label: <FormattedMessage id='日充' />,
        unit: "kWh"
    },
    {
        value: 308,
        label: <FormattedMessage id='日放' />,
        unit: "kWh"

    },
];


export const MgOcInitDataType = [
    {
        value: 154,
        label: <FormattedMessage id='电表总功率' />,
        unit: "kW"

    },
    {
        value: 175,
        label: <FormattedMessage id='BMS功率' />,
        unit: "kW"

    },

    {
        value: 169,
        label: <FormattedMessage id='PCS功率' />,
        unit: "kW"

    },
    {
        value: 301,
        label: <FormattedMessage id='日充电电量' />,
        unit: "kWh"

    },
    {
        value: 302,
        label: <FormattedMessage id='日放电电量' />,
        unit: "kWh"

    },
    {
        value: 183,
        label: <FormattedMessage id='SOC' />,
        unit: "%"

    },
    {
        value: 999,
        label: <FormattedMessage id='充放电效率' />,
        unit: "%"

    },
];

export const runOutData = [
    {
        title: "电池状态",
        selectKey: 'bms',
        value: [
            { name: "BMS系统状态", value: "-", key: "bmsRunStatus" },
            { name: "BMS充放电状态", value: "-", key: "batCdState" },
            { name: "电池禁止充电状态", value: "-", key: "batFCFlag" },
            { name: "电池禁止放电状态", value: "-", key: "batFDFlag" },
            { name: "电压", value: "-", key: "vol" },
            { name: "电流", value: "-", key: "cur" },
            { name: "功率", value: "-", key: "power" },
            { name: "SOC", value: "-", key: "soc" },
            { name: "SOH", value: "-", key: "soh" },
            { name: "累计充电电量", value: "-", key: "totalChargeEnergy" },
            { name: "累计放电电量", value: "-", key: "totalDischargeEnergy" },
            { name: "系统充放电循环次数", value: "-", key: "cycleCount" },
            { name: "充电可用电能量", value: "-", key: "allowChargeEnergy" },
            { name: "放电可用电能量", value: "-", key: "allowDischargeEnergy" },
            { name: "单体最高电压", value: "-", key: "cellVolMax" },
            { name: "单体最高电压电芯序号", value: "-", key: "cellVolMaxNo" },
            { name: "单体最低电压", value: "-", key: "cellVolMin" },
            { name: "单体最低电压电芯序号", value: "-", key: "cellVolMinNo" },
            { name: "堆单体压差", value: "-", key: "cellVolDiff" },
            { name: "单体最高温度", value: "-", key: "cellTempMax" },
            { name: "单体最高温度电芯序号", value: "-", key: "cellTempMaxNo" },
            { name: "单体最低温度", value: "-", key: "cellTempMin" },
            { name: "单体最低温度电芯序号", value: "-", key: "cellTempMinNo" },
            { name: "堆单体温差", value: "-", key: "cellTempDiff" },
            { name: "充电电压限值", value: "-", key: "chargeVolLimit" },
            { name: "充电电流限值", value: "-", key: "allowMaxChargeCur" },
            { name: "充电功率限值", value: "-", key: "allowMaxChargePower" },
            { name: "放电电压限值", value: "-", key: "dischargeVolLimit" },
            { name: "放电电流限值", value: "-", key: "allowMaxDischargeCur" },
            { name: "放电功率限值", value: "-", key: "allowMaxDischargePower" },
            { name: "正极最小绝缘电阻", value: "-", key: "positiveMinInResistance" },
            { name: "负极最小绝缘电阻", value: "-", key: "cathodeMinInResistance" },

        ],
    },
    {
        title: "PCS",
        selectKey: 'pcs',
        value: [
            { name: "PCS状态", value: "-", key: "stopBtnState" },
            { name: "PCS运行状态", value: "-", key: "pcsState" },
            { name: "PCS告警状态", value: "-", key: "pcsWarnState" },
            { name: "PCS故障状态", value: "-", key: "pcsFaultState" },
            { name: "IGBT风机状态", value: "-", key: "igbtFanState" },
            { name: "防雷器状态", value: "-", key: "lightingArresterState" },
            { name: "直流接触器状态", value: "-", key: "dcContactorState" },
            { name: "绝缘检测接触器状态", value: "-", key: "irContactorState" },
            { name: "直流电压", value: "-", key: "batVol" },
            { name: "直流电流", value: "-", key: "batCur" },
            { name: "直流功率", value: "-", key: "batPower" },
            { name: "电网电压", value: "-", key: "gridVol" },
            { name: "电网电流", value: "-", key: "ac" },
            { name: "电网频率", value: "-", key: "totalFreq" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "A相IGBT温度", value: "-", key: "phaseAIgbtTemp" },
            { name: "B相IGBT温度", value: "-", key: "phaseBIgbtTemp" },
            { name: "C相IGBT温度", value: "-", key: "phaseCIgbtTemp" },
            { name: "环境温度", value: "-", key: "envTemp" },
            { name: "日充电量", value: "-", key: "dayCEnergy" },
            { name: "日放电量", value: "-", key: "dayDEnergy" },
            { name: "总充电电量", value: "-", key: "totalCEnergy" },
            { name: "总放电电量", value: "-", key: "totalDEnergy" },
            {
                name: "最大可充功率",
                value: "-",
                key: "maxCPower",
            },
            { name: "最大可放功率", value: "-", key: "maxDPower" },

            // { name: "频率", value: "-", key: "totalFreq" },

            { name: "绝缘阻抗", value: "-", key: "ir" },


        ],
    },
    {
        title: "户外柜电表",
        selectKey: 'tmeter',
        value: [
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "总频率", value: "-", key: "totalFreq" },
            { name: "A相视在功率", value: "-", key: "apparentAPower" },
            { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
            { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "A功率因数", value: "-", key: "phaseAFactor" },
            { name: "A相电压", value: "-", key: "phaseAVol" },
            { name: "A相电流", value: "-", key: "phaseACur" },
            { name: "B相视在功率", value: "-", key: "apparentBPower" },
            { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
            { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "B功率因数", value: "-", key: "phaseBFactor" },
            { name: "B相电压", value: "-", key: "phaseBVol" },
            { name: "B相电流", value: "-", key: "phaseBCur" },
            { name: "C相视在功率", value: "-", key: "apparentCPower" },
            { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
            { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "C功率因数", value: "-", key: "phaseCFactor" },
            { name: "C相电压", value: "-", key: "phaseCVol" },
            { name: "C相电流", value: "-", key: "phaseCCur" },
            { name: "AB线电压", value: "-", key: "lineAbVol" },
            { name: "BC线电压", value: "-", key: "lineBcVol" },
            { name: "AC线电压", value: "-", key: "lineAcVol" },
        ],
    },
    {
        title: "储能关口计量",
        selectKey: 'gmeter',
        value: [
            { name: "总充电电量", value: "-", key: "totalCEnergy" },
            { name: "总放电电量", value: "-", key: "totalDEnergy" },
            { name: "日放电电量", value: "-", key: "dayDischargeEnergy" },
            { name: "日充电电量", value: "-", key: "dayChargeEnergy" },
            { name: "月充电电量", value: "-", key: "monChargeEnergy" },
            { name: "月放电电量", value: "-", key: "monDischargeEnergy" },
            { name: "尖时段总充电电量", value: "-", key: "totalTipCEnergy" },
            { name: "峰时段总充电电量", value: "-", key: "totalPeakCEnergy" },
            { name: "平时段总充电电量", value: "-", key: "totalFlatCEnergy" },
            { name: "谷时段总充电电量", value: "-", key: "totalValleyCEnergy" },
            { name: "尖时段总放电电量", value: "-", key: "totalTipDEnergy" },
            { name: "峰时段总放电电量", value: "-", key: "totalPeakDEnergy" },
            { name: "平时段总放电电量", value: "-", key: "totalFlatDEnergy" },
            { name: "谷时段总放电电量", value: "-", key: "totalValleyDEnergy" },
            { name: "尖时段日充电电量", value: "-", key: "tipChargeEnergy" },
            { name: "峰时段日充电电量", value: "-", key: "peakChargeEnergy" },
            { name: "平时段日充电电量", value: "-", key: "flatChargeEnergy" },
            { name: "谷时段日充电电量", value: "-", key: "valleyChargeEnergy" },
            { name: "尖时段日放电电量", value: "-", key: "tipDischargeEnergy" },
            { name: "峰时段日放电电量", value: "-", key: "peakDischargeEnergy" },
            { name: "平时段日放电电量", value: "-", key: "flatDischargeEnergy" },
            { name: "谷时段日放电电量", value: "-", key: "valleyDischargeEnergy" },
            { name: "尖时段月充电电量", value: "-", key: "monTipCEnergy" },
            { name: "峰时段月充电电量", value: "-", key: "monPeakCEnergy" },
            { name: "平时段月充电电量", value: "-", key: "monFlatCEnergy" },
            { name: "谷时段月充电电量", value: "-", key: "monValleyCEnergy" },
            { name: "尖时段月放电电量", value: "-", key: "monTipDEnergy" },
            { name: "峰时段月放电电量", value: "-", key: "monPeakDEnergy" },
            { name: "平时段月放电电量", value: "-", key: "monFlatDEnergy" },
            { name: "谷时段月放电电量", value: "-", key: "monValleyDEnergy" },
            { name: "总收益", value: "-", key: "sumEarning" },
            { name: "日收益", value: "-", key: "dayEarning" },
            { name: "月收益", value: "-", key: "monEarning" },

        ],
    },
    {
        title: "内部设备",
        selectKey: 'bms',
        value: [
            { name: "除湿机当前温度", value: "-", key: "deTemp" },
            { name: "除湿机当前湿度", value: "-", key: "deHum" },
            { name: "除湿机温度启动值", value: "-", key: "deTempStart" },
            { name: "除湿机温度停止值", value: "-", key: "deTempStop" },
            { name: "除湿机湿度启动值", value: "-", key: "deHumStart" },
            { name: "除湿机湿度停止值", value: "-", key: "deHumStop" },
            { name: "液冷当前模式", value: "-", key: "lcMode" },
            { name: "水泵状态", value: "-", key: "wpState" },
            { name: "压缩机状态", value: "-", key: "csState" },
            { name: "液冷制冷点", value: "-", key: "lcRePoint" },
            { name: "液冷加热点", value: "-", key: "lcHeatPoint" },
            { name: "液冷制冷回差", value: "-", key: "lcCoolDiff" },
            { name: "液冷加热回差", value: "-", key: "lcHeatDiff" },
            { name: "液冷出水温度", value: "-", key: "lcOutletTemp" },
            { name: "液冷回水温度", value: "-", key: "lcCoolTemp" },
            { name: "液冷排气温度", value: "-", key: "lcExhaustTemp" },
            { name: "液冷进水压力", value: "-", key: "lcInletPressure" },
            { name: "液冷出水压力", value: "-", key: "lcOutletPressure" },
            { name: "液冷环境温度", value: "-", key: "lcEnvTemp" },
        ]
    },
]

export const electricTypeList = [
    { label: '尖', value: 'pointed' },
    { label: '峰', value: 'peak' },
    { label: '平', value: 'flat' },
    { label: '谷', value: 'valley' },
];

export const timeSplitSymbol = "-";
