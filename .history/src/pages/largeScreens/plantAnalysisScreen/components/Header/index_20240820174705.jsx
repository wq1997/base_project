import styles from "./index.less";
import classNames from "classnames";
import area from "@/assets/images/area.svg";
import { useState, useEffect } from "react";
import { Form, Select, Input, Badge, Space, Search } from "antd";
import { SearchInput1 } from "@/components";

const Header = ({ onChangedType, onChangedArea }) => {
    const [area, setArea] = useState();
    const [plantName, setPlantName] = useState();
    const [currentType, setCurrentType] = useState("Business");
    const typeList = [
        {
            value: "Business",
            title: "工商侧",
        },
        {
            value: "Network",
            title: "源网侧",
        },
    ];

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                {typeList?.map(item => {
                    return (
                        <div
                            className={classNames(
                                styles.headerLeftLeftItem,
                                currentType == item.value && styles.active
                            )}
                            style={{
                                backgroundColor: "#0B3858",
                                //  background: `url('../../../../../assets/images/area.svg') center center no-repeat`,
                                backgroundSize: item?.value === currentType && "cover",
                            }}
                            onClick={() => {
                                setCurrentType(item?.value);
                                onChangedType(item?.value);
                            }}
                        >
                            {item?.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Header;
