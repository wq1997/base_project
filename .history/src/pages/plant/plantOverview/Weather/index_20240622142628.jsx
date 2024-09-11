import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styles from "./index.less";
import dayjs from "dayjs";
import plant from "../../../../../public/icons/plant.svg";

const dateNums = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

const Index = ({ data }) => {
    return (
        <>
            <div className={styles.index}>
                {1 && (
                    <>
                        <div className={classnames(styles.item, styles.today)}>
                            <div className={styles.weather}>
                                <i
                                    class={`qi-${data?.[1]?.iconDay} icon`}
                                    style={{ color: "#1677ff", fontSize: "32px" }}
                                ></i>
                                <span className={styles.date}>{data?.[0]?.textDay}</span>
                            </div>
                            <div className={styles.tempDate}>
                                <div className={styles.temp}>20 ~ 32 ℃</div>
                                <div className={styles.date}>
                                    {dateNums[dayjs(data?.[0]?.fxDate).day()]} {data?.[0]?.fxDate}
                                </div>
                            </div>
                        </div>
                        <div className={styles.border}></div>
                        {data?.slice(1)?.map((item, index) => (
                            <>
                                <div className={styles.item}>
                                    <div className={styles.weather}>
                                        <i
                                            class={`qi-${item?.iconDay} icon`}
                                            style={{ color: "#1677ff", fontSize: "32px" }}
                                        ></i>
                                        <span className={styles.date}>{item.fxDate}</span>
                                    </div>
                                </div>
                                {index == 0 && <div className={styles.border}></div>}
                            </>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default Index;
