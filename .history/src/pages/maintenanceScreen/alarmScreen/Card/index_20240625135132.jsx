import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import arrow from "../images/箭头.svg";

const Index = () => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const alarmLevelRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const gridPointRef = useRef();
    const [gridPoint, setGridPoint] = useState();
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const startTimeRef = useRef();
    const [startTime, setStartTime] = useState();
    const alarmDescRef = useRef();
    const [alarmDesc, setAlarmDesc] = useState();
    const [listData, setListData] = useState([]);

    const columns = [
        {
            title: "设备类型",
            dataIndex: "type",
        },
        {
            title: "告警等级",
            dataIndex: "level",
         
    
 

   

    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={arrow} className={styles.arrow} />
                告警列表
            </div>
            <div className={styles.list}>
                 
            </div>
        </div>
    );
};

export default Index;
