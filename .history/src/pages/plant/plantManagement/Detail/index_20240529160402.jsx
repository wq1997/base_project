import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Tooltip } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/plant";
import "./index.less";

const items = [
    {
      key: '1',
      label: 'UserName',
       
    },
    {
      key: '2',
      label: 'Telephone',
       
    },
    {
      key: '3',
      label: 'Live',
      children: <p>Hangzhou, Zhejiang</p>,
    },
    {
      key: '4',
      label: 'Remark',
      children: <p>empty</p>,
    },
    {
      key: '5',
      label: 'Address',
      children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
    },
  ];

const Company = ({ detailId, onClose }) => {
    const [inviteInfo, setInviteInfo] = useState();
    const [detail, setDetail] = useState();

    const getDetail = async () => {
        const res = await getPlantInfoByIdServer(detailId);
        if (res?.data?.code == 200) {
            setDetail(res?.data?.data);
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title="电站详情"
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <Descriptions title="User Info" items={items} />;
        </Modal>
    );
};

export default Company;
