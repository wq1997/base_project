import React from "react";
import { Tabs } from "antd";
import InvitationList from "./invitationList";

const Invitation = () => {
    const items = [
        {
            key: "1",
            label: "Tab 1",
            children:  <InvitationList/>
        },
        {
            key: "2",
            label: "Tab 2",
            children: "Content of Tab Pane 2",
        },
         
    ];

    return <Tabs defaultActiveKey="1" items={items} />;
};

export default Invitation;
