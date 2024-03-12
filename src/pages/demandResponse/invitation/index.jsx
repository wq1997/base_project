import React from "react";
import { Tabs } from "antd";
import { CardPage } from "@/components";
import InvitationList from "./invitationList";
import TaskList from './taskList'

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
            children: <TaskList />
        },
    ];

    return (
        <CardPage>
            <Tabs defaultActiveKey="1" items={items} />
        </CardPage>
    );
};

export default Invitation;
