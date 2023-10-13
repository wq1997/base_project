import { history, useLocation } from "umi";
import { Tabs } from "antd";
import { Header } from "@/components";
import { getQueryString } from "@/utils/utils";
import { useState } from "react";
import styles from "./index.less";
import List from "./components/List";

const defaultPageType = 'LIST';
const PageTypeList = [
  { label: "需求列表", key: 'LIST' },
  { label: "需求信息", key: 'INFO' }
];

const Release = () => {
    const location = useLocation();
    const { pathname } = location;
    const [type, setType] = useState(getQueryString('type')||defaultPageType);

    const onChangeTab = (key) => {
        setType(key);
        history.push(`${pathname}?type=${key}`);
    };

    return (
        <div className={styles.release}>
            <Header 
                title={'需求申报'}
                description={"分布式能源运行商向虚拟电厂运行商申报，由虚拟电厂运行商综合申报"}
                actions={
                    [
                        {
                            title: '+ 创建需求'
                        }
                    ]
                }
            />
            <div className={styles.content}>
                <Tabs
                    activeKey={type}
                    onChange={onChangeTab}
                    items={PageTypeList}
                />
                <div className={styles.contentData}>
                    {type==="LIST"&&<List />}
                </div>
            </div>
        </div>
    )
}

export default Release;