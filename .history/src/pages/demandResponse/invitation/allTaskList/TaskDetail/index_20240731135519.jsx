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
        console.log("taskDetailData", baseLineArgs);
        if (baseLineArgs) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [baseLineArgs]);

    const items = [
        {
            key: "1",
            label: "汇总基线",
            children: <Summary />,
        },
        {
            key: "2",
            label: "历史负载",
            children: <Listory />,
        },
    ];

    return (
        <Modal
            title="查看基线"
            width={1000}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Summary />
        </Modal>
    );
};

export default BaseLine;
