import React from "react";
import { Tabs } from "antd";
import { Outlet, history, useLocation } from "umi";
import { CardPage } from "@/components";
import InvitationList from "./invitationList";
import AllTaskList from "./allTaskList";

const Invitation = () => {
    const location = useLocation();
    const { pathname } = location;

    const items = [
        {
            key: "/vpp/demandResponse/invitation/invitationList",
            label: "邀约列表",
            children: <InvitationList />,
        },
        {
            key: "/vpp/demandResponse/invitation/allTaskList",
            label: "任务清单",
            children: <AllTaskList />,
        },
    ];

    const onChange = value => {
        history.push(value);
    };

    return (
        <CardPage>
            <Tabs defaultActiveKey={pathname} items={items} onChange={onChange} />
            <Outlet />
        </CardPage>
    );
};

export default Invitation;
