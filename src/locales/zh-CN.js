// const arr=['今日充电量','今日放电量','累计充电量','累计放电量','今日充放电效率','累计充放电效率',];
// const getObj=(orign)=>{
//     let obj={};
//     orign.map(it=>{
//         obj[it]=it;
//     })
// return obj
// }
// let newObj=getObj(arr);
export default {
    app:{
        title: '采日工商业微网孪生平台',
        Query:'查询',
        Export:'导出',
        Language:'语言',
        Chinese:'中文',
        English:'英文',
        Theme:'主题',
        Light:'浅色',
        Dark:'深色',
        SignoOut:'登出',
        Overview:'总览',
        Device:'设备',
        Statistics:'统计',
        Alarm:'告警',
        DepotSettings:'场站设置',
        SystemAdministration:'系统管理',
        RealTimeAlerts:'实时告警',
        HistoricalAlerts:'历史告警',
        AlarmRules:'告警规则',
        PolicyConfiguration:'策略配置',
        PowerStationConfiguration:'电站配置',
        UserManagement:"用户管理",
        RecordsOfOperations:'操作记录',
        ElectricityStatistics:'电量统计',
        EarningsStatistics:'收益统计',
        DataComparison:'数据对比',
        ReportExport:'报表导出',
        Welcometologin:'欢迎登录!',
    },
    device:{
        EnergyStorage:'储能',
        Photovoltaic:'光伏',
        ChargingPiles:'充电桩',
    },
    statistics:{
        InternetPower:'上网电量',
        TheGridBuysElectricity:'电网买电量',
        EnergyStorageCharge:'储能充电量',
        EnergyStorageDischarge:'储能放电量',
        PhotovoltaicPowerGeneration:'光伏发电量',
        TheAmountOfCharging:'充电桩充电量',
        PhotovoltaicPower:'充电桩充电量',
        PowerGeneration:'发电量',
        InternetUsage:'上网量',

    },
    '今日充电量':'今日充电量',
    '今日放电量':'今日放电量',
    '累计充电量':'累计充电量',
    '累计放电量':'累计放电量',
    '今日充放电效率':'今日充放电效率',
    '累计充放电效率':'累计充放电效率',
    '当前总功率:':'当前总功率:',
    '设备状态':'设备状态',
    '累计充放电效率':'累计充放电效率',
    '正常':'正常',
    '故障':'故障',
    '个':'个',
    '日收益':'日收益',
    '周收益':'周收益',
    '月收益':'月收益',
    '累计收益':'累计收益',
    '用户名':'用户名',
    '操作对象':'操作对象',
    '描述':'描述',
    '操作时间':'操作时间',
    '开始':'开始',
    '时间':'时间',
    '结束':'结束',
    '切换账号':'切换账号',
    '退出登录':'退出登录',
    '请输入账号':'请输入账号',
    '请输入密码':'请输入密码',
    '请输入验证码':'请输入验证码',
    '记住密码':'记住密码',
    '告警等级':'告警等级',
    '低级':'低级',
    '普通':'普通',
    '严重':'严重',
    '高级':'高级',
    '推送方式':'推送方式',
    '邮件':'邮件',
    '短信':'短信',
    '微信':'微信',
    '每小时推送上限':'每小时推送上限',
    '是否启用':'是否启用',
    '启用':'启用',
    '禁用':'禁用',
    '状态':'状态',
    '接收人':'接收人',
    '操作':'操作',
    '编辑':'编辑',
    '删除':'删除',
    '新增告警规则':'新增告警规则',
    '编辑告警规则':'编辑告警规则',
    '告警规则':'告警规则',
    '新增':'新增',
    '数据删除后将无法恢复，是否确认删除该条数据？':'数据删除后将无法恢复，是否确认删除该条数据？',
    '储能':'储能',
    '光伏':'光伏',
    '充电桩':'充电桩',
    '严重告警历史总数':'严重告警历史总数',
    '今日处理严重告警数':'今日处理严重告警数',
    '近半年严重告警平均处理时长':'近半年严重告警平均处理时长',
    '设备类型':'设备类型',
    '实时告警':'实时告警',
    '导出':'导出',
    '功率设置':'功率设置',
    '通讯状态':'通讯状态',
    '运行状态':'运行状态',
    '有功功率':'有功功率',
    '开机':'开机',
    '关机':'关机',
    '复位':'复位',
    '设备名称':'设备名称',
    '低压分闸':'低压分闸',
    '高压分闸':'高压分闸',
    '低压合闸':'低压合闸',
    '高压合闸':'高压合闸',
    '低压侧有功功率':'低压侧有功功率',
    '高压侧有功功率':'高压侧有功功率',
    '低压侧频率':'低压侧频率',
    '高压侧频率':'高压侧频率',
    '请选择并网点':'请选择并网点',
    '日历':'日历',
    '策略列表':'策略列表',
    '电站名称':'电站名称',
    '所属用户':'所属用户',
    '电站位置':'电站位置',
    '电站类型':'电站类型',
    '经度':'经度',
    '纬度':'纬度',
    '建站日期':'建站日期',
    '储能装机容量':'储能装机容量',
    '光伏装机容量':'光伏装机容量',
    '充电桩装机容量':'充电桩装机容量',
    '运行温度上限':'运行温度上限',
    '运行温度下限':'运行温度下限',
    '并网日期':'并网日期',
    '所属时区':'所属时区',
    '所属货币':'所属货币',
    '新增电站':'新增电站',
    '编辑电站':'编辑电站',
    '电站配置':'电站配置',
    '系统提示':'系统提示',
    '充电电压':'充电电压',
    '充电功率':'充电功率',
    '充电电量':'充电电量',
    '车辆SOC':'车辆SOC',
    '累计电费':'累计电费',
    '累计服务费':'累计服务费',
    '累计总金额':'累计总金额',
    '开始时间':'开始时间',
    '更新时间':'更新时间',
    '运行时长':'运行时长',
    '订单号':'订单号',
    '订单状态':'订单状态',
    '充电桩一览表':'充电桩一览表',
    '充电桩总数':'充电桩总数',  
    '充电中':'充电中',
    '已插枪':'已插枪',
    '空闲中':'空闲中',
    '故障中':'故障中',
    '日充电量':'日充电量',
    '直流桩':'直流桩',
    '交流桩':'交流桩',
    '电表详情':'电表详情',
    '监测曲线':'监测曲线',   
    '电表数据':'电表数据',
    '当天充电电量':'当天充电电量',
    '数据类型':'数据类型',
    '查询':'查询',
    '温差':'温差',
    '最高温度':'最高温度',
    '采样点':'采样点',
    '最低温度':'最低温度',
    '电压差':'电压差',
    '最大电压':'最大电压',
    '第':'第',
    '节':'节',
    '最小电压':'最小电压',
    '温度':'温度',
    '电压':'电压',
    '最多选择3个对比项':'最多选择3个对比项',
    '相同时间 不同数据项':'相同时间 不同数据项',
    '不同时间  相同数据项':'不同时间  相同数据项',
    'Pack极柱温度':'Pack极柱温度',
    '负极':'负极',
    '正极':'正极',
    'Pack熔断器温度':'Pack熔断器温度',
    '左侧熔断器':'左侧熔断器',
    '右侧熔断器':'右侧熔断器',
    'BMS数据':'BMS数据',
    '电芯详情':'电芯详情',
    '高级分析':'高级分析',
    '运行数据':'运行数据',
    'PCS详情':'PCS详情',
    '对比日期':'对比日期',
    '实时功率':'实时功率',
    '总量':'总量',
    '今日':'今日',
    'PACK电芯':'PACK电芯',
    '电池pack':'电池pack',
    '设备详情':'设备详情',
    '策略功率':'策略功率',
    '运行功率':'运行功率',
    '放电量':'放电量',
    '充电量':'充电量',
    '收益':'收益',
    '充放电功率':'充放电功率',
    '告警':'告警',
    '收益统计':'收益统计',
    '元':'元',
    '充放电量':'充放电量',
    '设备状态':'设备状态',
    '正常':'正常',
    '故障':'故障',
    '运行指标':'运行指标',
    '电量':'电量',
    '累计收益':'累计收益',
    '月收益':'月收益',
    '周收益':'周收益',
    '日收益':'日收益',
    '累计充放电效率':'累计充放电效率',
    '今日充放电效率':'今日充放电效率',
    '累计放电量':'累计放电量',
    '累计充电量':'累计充电量',
    '今日放电量':'今日放电量',
    '今日充电量':'今日充电量',
    '储能总览':'储能总览',
    '设备列表':'设备列表',
    '请输入关键字进行过滤':'请输入关键字进行过滤',
    '告警信息':'告警信息',
    '故障时间':'故障时间',
    '故障描述':'故障描述',
    '故障等级':'故障等级',
    '发电量':'发电量',
    '发电量统计':'发电量统计',
    '累计并网量':'累计并网量',
    '累计发电量':'累计发电量',
    '今日并网量':'今日并网量',
    '今日发电量':'今日发电量',
    '装机容量':'装机容量',
    '投运日期':'投运日期',
    '安装位置':'安装位置',
    '负载':'负载',
    '充电桩电量':'充电桩电量',
    '光伏日发电量':'光伏日发电量',
    '储能日放':'储能日放',
    '储能日充':'储能日充',
    '充电桩累计充电量':'充电桩累计充电量',
    '光伏累计发电量':'光伏累计发电量',
    '储能累计放电量':'储能累计放电量',
    '储能累计充电量':'储能累计充电量',
    '今日收益':'今日收益',
    '累计收益':'累计收益',
    '电量统计':'电量统计',
    '功率':'功率',
    '总计':'总计',
    '谷电':'谷电',
    '平电':'平电',
    '峰电':'峰电',
    '尖电':'尖电',
    '日':'日',
    '月':'月',
    '年':'年',
    '序号':'序号',
    '上网电量':'上网电量',
    '储能充电量':'储能充电量',
    '储能放电量':'储能放电量',
    '光伏发电量':'光伏发电量',
    '上网电量':'上网电量',
    '发电量':'发电量',
    '提交成功':'提交成功',
    '总收益':'总收益',
    '光伏收益':'光伏收益',
    '储能收益':'储能收益',
    '充电桩收益':'充电桩收益',
    '收益明细':'收益明细',
    '充电成本':'充电成本',
    '放电收益':'放电收益',
    '实际收益':'实际收益',
    '发电收益':'发电收益',
    '充电收益':'充电收益',
    '用户名':'用户名',
    '开始':'开始',
    '时间':'时间',
    '结束':'结束',
    '操作时间':'操作时间',
    '确认密码':'确认密码',
    '两次密码输入不一致':'两次密码输入不一致',
    '手机':'手机',
    '邮箱':'邮箱',
    '公司':'公司',
    '描述':'描述',
    '密码修改成功':'密码修改成功',
    '编辑用户信息':'编辑用户信息',
    '确认修改':'确认修改',
    '新增用户':'新增用户',
    '普通用户':'普通用户',
    '管理员':'管理员',
    '重置密码':'重置密码',
    '编辑用户':'编辑用户',
    '密码重置成功':'密码重置成功',
    '选择':'选择',
    '角色':'角色',
    '运维管理':'运维管理',
    '切换电站':'切换电站',
    '电站配置':'电站配置',
    '电站信息':'电站信息',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
}

