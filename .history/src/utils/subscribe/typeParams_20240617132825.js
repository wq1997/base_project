/*  
    8001->开机
    8002->关机
    8004->直流电弧故障清除
    8005->故障复位
    8006->有功调节
    8007->无功调节
    8008->功率因数调节
*/

export default {
    ISSUE_COMMAND: {
        subURL: " ws/device-config",
        topicURL: "/topic/device-config/token/cmdType",
        commandIds: [8001, 8002, 8003, 8004, 8005, 8006, 8007, 8008],
    },
};
