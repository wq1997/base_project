
import React, { useState, useEffect } from 'react';
import { getQueryString } from "@/utils/utils";
import { theme, Tree, Input } from "antd";
import { Title } from "@/components";
import Overview from './components/Overview';
import Cabinet from './components/Cabinet';
import ElectricityMeter from './components/ElectricityMeter';
import { TreeData } from "./mock.js";
import { history, useLocation } from "umi";
import styles from "./index.less";

const defaultPageType = "ALL";

function Com(props) {
    const location = useLocation();
    const { pathname } = location;
    const { token } = theme.useToken();
    const [pageType, setPageType] = useState(getQueryString("pageType") || defaultPageType)

    const onSelect = (selectedKeys, e) => {
        setPageType(e.node.key);
        history.push(`${pathname}?pageType=${e.node.key}&id=${e.node.id}`);
    }

    const getPage = () => {
        switch(pageType){
            case "ALL":
                return <Overview />;
            case "CABINET":
                return <Cabinet />;
            case "ELECTRICITYMATER":
                return <ElectricityMeter />
            default:
                return <Overview />
        }
    }

    useEffect(() => {
    }, [])
    return (
        <div className={styles.content} style={{color:token.smallTitleColor}}>
            <div className={styles.contentLeft} style={{backgroundColor:token.titleCardBgc}}>
                <Title title={'设备列表'} />
                <Input 
                    placeholder='请输入关键字进行过滤' 
                    style={{marginTop: 10}}
                />
                <div className={styles.contentLeftTree}>
                    <Tree treeData={TreeData} onSelect={onSelect} defaultExpandAll selectedKeys={[pageType]} />
                </div>
            </div>
            <div className={styles.contentRight} style={{backgroundColor:token.titleCardBgc}}>
                {getPage()}
            </div>
        </div>
    )
}

export default Com