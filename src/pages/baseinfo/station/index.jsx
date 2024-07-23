import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Outlet, history, useLocation, useSelector } from "umi";
import { CardPage } from "@/components";
import { hasPerm, recordPage } from "@/utils/utils";

const Station = () => {
    recordPage('menu:load_resource');
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const { pathname } = location;

    const items = [
        hasPerm(user, "op:load_resource_add") && {
            key: "/vpp/baseinfo/station/stationList",
            label: "场站信息管理",
        },
        hasPerm(user, "op:company_add") && {
            key: "/vpp/baseinfo/station/companyList",
            label: "公司信息管理",
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

export default Station;
