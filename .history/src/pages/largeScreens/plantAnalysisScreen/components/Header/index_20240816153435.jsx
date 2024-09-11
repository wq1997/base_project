import styles from "./index.less";
import classNames from "classnames";
import area from "@/assets/images/area.svg";
import { useState, useEffect } from "react";
import { Form, Select, Input, Badge, Space,Search } from "antd";
import { SearchInput1 } from "@/components";

const Header = ({ typeList, currentType, onChangedType }) => {
    const [area, setArea] = useState();
    const [plantName, setPlantName] = useState();

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
                            onClick={() => onChangedType(item?.value)}
                        >
                            {item?.title}
                        </div>
                    );
                })}
            </div>
            <div className={styles.headerRight}>
                <div style={{ width: "100%", display: "flex"  }}>
                    <Select
                        style={{ width: 100, marginRight: 10 }}
                        value={area}
                        type="select"
                        options={[
                            { lable: "国内", value: "国内" },
                            { label: "国外", value: "国外" },
                        ]}
                        placeholder="区域"
                        onChange={value => {
                            setArea(value);
                        }}
       
                    />
                    <Input.Search
                        style={{ flex: 1 }}
                        value={plantName}
                        placeholder="请输入电站名称"
                        onSearch={()=>{}}
                        onChange={e => {
                            setPlantName(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
