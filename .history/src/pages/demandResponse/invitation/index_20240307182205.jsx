import React from 'react';
import { Tabs } from 'antd';
import InvitationList from "./invitationList";

const Invitation = () => {
    return  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
};

export default Invitation;
