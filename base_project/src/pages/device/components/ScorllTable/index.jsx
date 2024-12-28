import { useRef } from "react";
import styles from "./index.less";
import { useEffect, useState } from "react";
let timer = null;
const Table = ({
    headerLineColor='white',
    color="white",
    columns,
    dataSource
}) => {
    const tableRef = useRef(null);
    const tableHeaderRef = useRef(null);
    const tableContentRef = useRef(null);
    const [tableContentHeight, setTableContentHeight] = useState(0);

    const startScroll = () => {
        const tableContentScrollHeight = tableContentRef?.current?.scrollHeight;
        let scrollTop = 0;
        clearInterval(timer);
        timer = setInterval(()=>{
            tableContentRef.current.style.top = `-${scrollTop}px`;
            if(scrollTop>=tableContentScrollHeight-5){
                scrollTop=0;
            }
            scrollTop++;
        }, 50)
    }

    const init = () => {
        const parentHeight = tableRef?.current?.parentElement?.clientHeight;
        const tableHeaderHeight = tableHeaderRef?.current?.clientHeight;
        const tableContentScrollHeight = tableContentRef?.current?.scrollHeight;
        setTableContentHeight(parentHeight-tableHeaderHeight);
        if(tableContentScrollHeight>tableContentHeight){
            startScroll();
        }
    }

    useEffect(()=>{
        init();
        window.addEventListener("resize", init);
    }, []);

    return (
        <div className={styles.table} ref={tableRef}>
            <div className={styles.tableHeader} style={{borderBottom: `3px solid ${headerLineColor}`}} ref={tableHeaderRef}>
                {
                    columns?.map(column => {
                        return (
                            <div className={styles.tableHeaderTitle} style={{color}}>{column?.title}</div>
                        )
                    })
                }
            </div>
            <div className={styles.tableOuterContent} style={{height: tableContentHeight}}>
                <div className={styles.tableContent} ref={tableContentRef}> 
                    {
                        dataSource?.map(data => {
                            return (
                                <div className={styles.tableContentRow}>
                                    {
                                        columns?.map(item => item.key)?.map(columnKey => {
                                            return (
                                                <div className={styles.tableContentCol} style={{color}}>{data[columnKey]}</div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Table;