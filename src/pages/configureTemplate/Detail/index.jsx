import React, { useState, useEffect } from "react";
import { Modal, Image, Descriptions } from "antd";
import { getTemplateInfo as getTemplateInfoServer } from "@/services/api";
import "./index.less";

const baseUrl = process.env.API_URL_1;

const baseItems = [
    {
        label: "数据类型",
        key: "dataType",
    },
    {
        label: "设备类型",
        key: "deviceType",
    },
    {
        label: "取值维度",
        key: "dimension",
    },
    {
        label: "sheet名",
        key: "sheetName",
    },
    {
        label: "详细时间列",
        key: "systemTime",
    },
    {
        label: "详细时间格式",
        key: "timeFormat",
    },
    {
        label: "电流取值逻辑",
        key: "currentStrategy",
        span: 2,
    },
    {
        label: "簇电压所在列",
        key: "stackVoltage",
    },
    {
        label: "簇电流所在列",
        key: "clusterCurrent",
    },
    {
        label: "簇SOC所在列",
        key: "clusterSoc",
    },
    {
        label: "单体电压单位",
        key: "singleVoltageUnit",
    },
    {
        label: "单体电压开始列",
        key: "singleVoltageStart",
    },
    {
        label: "单体电压结束列",
        key: "singleVoltageEnd",
    },
    {
        label: "单体温度开始列",
        key: "singleTemperatureStart",
    },
    {
        label: "单体温度结束列",
        key: "singleTemperatureEnd",
    },
    {
        label: "极柱温度开始列",
        key: "poleTemperatureStart",
    },
    {
        label: "极柱温度结束列",
        key: "poleTemperatureEnd",
    },
];

const Company = ({ detailId, onClose }) => {
    const [items, setItems] = useState();
    const getDetail = async () => {
        const res = await getTemplateInfoServer(detailId);
        if (res?.data?.code == 0) {
            const info = res?.data?.data;
            setItems(
                baseItems?.map(item => {
                    const isPic = item?.key == "logo" || item?.key == "photo";
                    const value = info?.[item.key];
                    return {
                        ...item,
                        children:
                            isPic && value ? (
                                <Image width={200} src={`${baseUrl}${value}`} />
                            ) : (
                                value
                            ),
                    };
                })
            );
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title=""
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <Descriptions title="模版详情" items={items} column={2} />
        </Modal>
    );
};

export default Company;
