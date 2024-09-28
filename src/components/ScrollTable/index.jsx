import { useRef } from "react";
import styles from "./index.less";
import { Button, Space, Spin, Tooltip, Pagination } from "antd";
import { useEffect, useState } from "react";
import { toChineseNumber, getAlarmColor } from "@/utils/utils";
const Table = ({ color = "white", columns, dataSource }) => {
    const [timer, setTimer] = useState(null);
    const tableRef = useRef(null);
    const tableHeaderRef = useRef(null);
    const tableContentRef = useRef(null);
    const [tableContentHeight, setTableContentHeight] = useState(0);

    const startScroll = () => {
        const parentHeight = tableRef?.current?.parentElement?.clientHeight;
        const tableHeaderHeight = tableHeaderRef?.current?.clientHeight;
        const tableContentHeight = tableContentRef?.current?.clientHeight;
        let scrollTop = 0;
        let newTimer = null;
        newTimer = setInterval(() => {
            if (tableContentRef?.current?.style) {
                tableContentRef.current.style.top = `-${scrollTop}px`;
                if (scrollTop >= tableHeaderHeight + tableContentHeight - parentHeight) {
                    scrollTop = 0;
                }
                scrollTop++;
            }
        }, 100);
        setTimer(newTimer);
    };

    const init = () => {
        const parentHeight = tableRef?.current?.parentElement?.clientHeight;
        const tableHeaderHeight = tableHeaderRef?.current?.clientHeight;
        const tableContentScrollHeight = tableContentRef?.current?.scrollHeight;
        setTableContentHeight(parentHeight - tableHeaderHeight);
        if (tableContentScrollHeight > parentHeight - tableHeaderHeight) {
            startScroll();
        }
    };

    useEffect(() => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        init();
    }, [dataSource]);

    return (
        <div className={styles.table} ref={tableRef}>
            <div className={styles.tableHeader} ref={tableHeaderRef}>
                {columns?.map(column => {
                    return (
                        <div className={styles.tableHeaderTitle} style={{ color }}>
                            {column?.title}
                        </div>
                    );
                })}
            </div>
            <div className={styles.tableOuterContent} style={{ height: tableContentHeight }}>
                <div className={styles.tableContent} ref={tableContentRef}>
                    {dataSource?.map(data => {
                        return (
                            <div
                                className={styles.tableContentRow}
                                style={{
                                    backgroundSize: "cover",
                                }}
                            >
                                {columns
                                    ?.map(item => item.key)
                                    ?.map(columnKey => {
                                        return (
                                            <div
                                                className={styles.tableContentCol}
                                                style={{ color }}
                                            // style={{
                                            //     color:
                                            //         columnKey == "prior"
                                            //             ? getAlarmColor(
                                            //                 data[columnKey]
                                            //             )
                                            //             : color
                                            // }}
                                            >
                                                <Tooltip title={data[columnKey]}>
                                                    {columnKey == "prior"
                                                        ? toChineseNumber(
                                                            data[columnKey]
                                                        ) + "级"
                                                        : data[columnKey]}
                                                </Tooltip>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Table;