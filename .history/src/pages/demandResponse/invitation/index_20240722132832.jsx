import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Outlet, history, useLocation, useSelector } from "umi";
import { CardPage } from "@/components";
import { hasPerm } from "@/utils/utils";

const Invitation = () => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const { pathname } = location;

    const items = [
        hasPerm(user, "op:invitation_list") && {
            key: "/vpp/demandResponse/invitation/invitationList",
            label: "邀约列表",
        },
        hasPerm(user, "op:invitation_resource_plan_list") && {
            key: "/vpp/demandResponse/invitation/allTaskList",
            label: "任务清单",
        },
    ]?.filter(item => item != false);

    const onChange = value => {
        history.push(value);
    };

    return (
        <CardPage>
            <Tabs defaultActiveKey={pathname} activeKey={pathname} items={items} onChange={onChange} />
            <Outlet />
        </CardPage>
    );
};

export default Invitation;
