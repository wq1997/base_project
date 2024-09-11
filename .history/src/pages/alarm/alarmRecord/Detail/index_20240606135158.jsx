import React, { useState, useEffect } from "react";
import { Modal, Image, Descriptions } from "antd";
import { getAlarmInfo as getAlarmInfoServer } from "@/services/plant";
import "./index.less";

const baseUrl = process.env.API_URL_1;

const baseItems = [
    {
        label: "电站名称",
        key: "name",
    },
    {
        label: "所属公司",
        key: "company",
    },
    {
        label: "电站类型",
        key: "plantTypeName",
    },
    {
        label: "电站组串总容量(kWp)",
        key: "totalCapacity",
    },
    {
        label: "电站地址",
        key: "address",
    },
    {
        label: "联系人",
        key: "contact",
    },
    {
        label: "联系方式",
        key: "contactWay",
    },
    {
        label: "并网时间",
        key: "gridTime",
    },
    {
        label: "经度",
        key: "longitude",
    },
    {
        label: "纬度",
        key: "latitude",
    },
    {
        label: "电站logo",
        key: "logo",
    },
    {
        label: "电站图片",
        key: "photo",
    },
];

const Company = ({ detailId, onClose }) => {
    const [items, setItems] = useState();
    const getDetail = async () => {
        const res = await getAlarmInfoServer(detailId);
        if (res?.data?.code == 200) {
            const plant = res?.data?.data;
            setItems(
                baseItems?.map(item => {
                    const isPic = item?.key == "logo" || item?.key == "photo";
                    const value = plant?.[item.key];
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
            <Descriptions title="电站详情" items={items} column={2} />
        </Modal>
    );
};

export default Company;
