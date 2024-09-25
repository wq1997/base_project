/*  
    pcs支路功率 7001
    pcs启停 7002
    bms启停 7003
    pcs支路启停 7004
    pcs功率波动 7011
    运行模式 7000
    自动模式 策略下发 7013
    自动模式时段策略 7021
*/
import { ISSUE_COMMAND } from "./types";
export default {
    [ISSUE_COMMAND]: {
        subURL: "/ws/cmd_status_info",
        topicURL: "/topic/cmd_status_info/user",
        progressTopicURL: "/topic/cmd_progress_info/user",
        commandIds: [7001, 7002, 7003, 7004, 7011, 7000, 7013,7021, "progress"],
    },
};
