import React, { useState, useEffect } from "react";
import { Tabs, Modal, theme, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/company";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const BaseLine = ({ taskDetailData, onClose }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const { token } = theme.useToken();

    const isInTimes = (time, times) => {
        const cur = dayjs(time, "HH:mm");
        const start = dayjs(times?.[0], "HH:mm");
        const end = dayjs(times?.[1], "HH:mm");
        return (cur.isAfter(start) || cur.isSame(start)) && cur.isBefore(end);
    };

    useEffect(() => {
        console.log("taskDetailData", taskDetailData);
        if (taskDetailData) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [taskDetailData]);
 

    return (
        <Modal
            title="任务要求"
            width={1000}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
             
        </Modal>
    );
};

export default BaseLine;
