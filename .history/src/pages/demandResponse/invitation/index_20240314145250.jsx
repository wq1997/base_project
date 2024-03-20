import React from "react";
import { Tabs } from "antd";
import { Outlet, history, useLocation } from "umi";
import { CardPage } from "@/components";
import InvitationList from "./invitationList";
import AllTaskList from './allTaskList'

const Invitation = () => {
    const items = [
        {
            key: "1",
            label: "邀约列表",
            children: <InvitationList />,
        },
        {
            key: "2",
            label: "任务清单",
            children: <AllTaskList />
        },
    ];

    return (
        <CardPage>
            <Tabs defaultActiveKey="1" items={items} />
            <Outlet />
        </CardPage>
    );
};

export default Invitation;
