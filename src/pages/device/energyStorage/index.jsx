
import React, { useState, useEffect, useMemo } from 'react';
import { getQueryString } from "@/utils/utils";
import { theme, Tree, Input } from "antd";
import { Title } from "@/components";
import Overview from './components/Overview';
import EnergyBMS from './components/EnergyBMS/index.jsx';
import ElectricityMeter from './components/ElectricityMeter';
import EnergyPCS from './components/EnergyPCS/index.jsx';
import ViewOutdoor from './components/ViewOutdoor/index.jsx';
import { root } from "./mock.js";
import { getDeviceTree, getGridPointTree } from '@/services/deviceTotal'
import { history, useLocation, useIntl } from "umi";
import styles from "./index.less";

const defaultPageType = "ALL";
let defaultData = [];
const getType = (father, child) => {
    if (father.deviceType == 6) {
        switch (child?.type) {
            case 100:
                return 'PCS';
            case 101:
                return 'BMS';
            case 104:
                return 'Meter';
            default:
                return 'PCS';
        }
    } else if (father.deviceType == 14) {
        switch (child?.type) {
            case 1:
                return 'PCS';
            case 3:
                return 'BMS';
            case 0:
                return 'Meter';
            default:
                return 'PCS';
        }
    } else {
        switch (child?.type) {
            case 3:
                return 'OutPart';
            case 105:
                return 'Meter';
            default:
                return 'OutPart';
        }
        // return child?.parentId ? 'OutPart' : 'Meter'

    }
}
const getTreeData = (data, treeData) => {
    let oringal = structuredClone(treeData);
    data?.map((it, index) => {
        if (it.dtuDevList) {
            let arr = [];
            it.dtuDevList?.map((item, i) => {
                arr?.push({
                    title: item.name,
                    id: item.id ||it.id|| it.dtuId || '',
                    key: `0-${index}-${i}`,
                    type: getType(it, item),
                    
                })
            })
            oringal[0]?.children.push({
                title: it.gridPointName,
                id: it.dtuId,
                gridPointId:it.id,
                key: `0-${index}`,
                type: it.type || it?.deviceType,
                children: [
                    ...arr
                ]
            })
        } else {
            oringal[0]?.children.push({
                title: it.gridPointName,
                id: it.dtuId,
                gridPointId:it.id,
                key: `0-${index}`,
                type: it.type || it?.deviceType,
                children: [
                    ...arr
                ]
            })
        }

    })
    defaultData = [...oringal];
}

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title, id, type } = node;
        dataList?.push({
            key,
            title,
            id,
            type
        });
        if (node.children) {
            generateList(node.children);
        }
    }
};

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};


function Com(props) {
    const location = useLocation();
    const { pathname } = location;
    const { token } = theme.useToken();
    const [pageType, setPageType] = useState(getQueryString("PageType") || defaultPageType)
    const [pageKey, setPageKey] = useState(getQueryString("PageKey") ||'ALL')
    const [tree, setTree] = useState([]);
    const [defaultDataFlag, setdefaultDataFlag] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const onSelect = (selectedKeys, e) => {
        setPageType(e.node.type);
        setPageKey(e.node.key);
        history.push(`${pathname}?PageKey=${e.node.key}&id=${e.node.id}&gridPointId=${e.node.gridPointId}&PageType=${e.node.type}&title=${e.node.title.props.children[2]}`);
    }
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        getTreeData(tree, root);
        generateList(defaultData);
        setdefaultDataFlag(!defaultDataFlag);
    }, [tree])

    useEffect(() => {
        const newExpandedKeys = dataList?.map((item) => {
            if (item.key.indexOf(getQueryString("PageKey")) > -1) {
                return getParentKey(item.key, defaultData);
            }
            return null;
        })
            .filter((item, i, self) => !!(item && self.indexOf(item) === i));
        setExpandedKeys(newExpandedKeys);
    }, [defaultDataFlag])
    useEffect(() => {
    }, [])
    const onChange = (e) => {
        const { value } = e.target;
        const newExpandedKeys = dataList?.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, defaultData);
            }
            return null;
        })
            .filter((item, i, self) => !!(item && self.indexOf(item) === i));
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };
    const getData = async () => {
        let { data } = await getGridPointTree({ plantId: localStorage.getItem('plantId') });
        setTree(data.data);
    }
    const treeData = useMemo(() => {
        const loop = (data) =>
            data?.map((item) => {
                const strTitle = item?.title;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: '#ED750E' }}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item.children) {
                    return {
                        title,
                        key: item.key,
                        id: item.id,
                        type: item.type,
                        gridPointId:item.gridPointId,
                        // selectable: false,
                        children: loop(item.children),
                    };
                }
                return {
                    title,
                    key: item.key,
                    id: item.id,
                    type: item.type,
                };
            });
        return loop(defaultData);
    }, [searchValue, defaultDataFlag]);
    const getPage = () => {
        switch (pageType) {
            case "ALL"://总览
                return   <Overview />;
            case "BMS":
                return <EnergyBMS />;
            case "PCS"://
                return <EnergyPCS id={
                    dataList.find(it => it.key == pageKey)?.id
                } />;
            case "Meter":
                return <ElectricityMeter id={
                    dataList.find(it => it.key == pageKey)?.id
                }/>;
            case 3:
                return <Overview />;
            case 9:
                return <ViewOutdoor />;
            default:
                return <Overview />;
        }
    }


    return (
        <div className={styles.content} style={{ color: token.smallTitleColor }}>
            <div className={styles.contentLeft} style={{ backgroundColor: token.titleCardBgc }}>
                <Title title={t('设备列表')} />
                <Input
                    placeholder={t('请输入关键字进行过滤')}
                    style={{ marginTop: 10 }}
                    // onSearch={onSearch}
                    onChange={onChange}
                />
                <div className={styles.contentLeftTree} style={{ backgroundColor: token.treeBgb }}>
                    <Tree
                        treeData={treeData}
                        onSelect={onSelect}
                        defaultExpandAll
                        selectedKeys={[pageKey]}
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        style={{ backgroundColor: token.treeBgb }} />
                </div>
            </div>
            <div className={styles.contentRight} >
                {getPage()}
            </div>
        </div>
    )
}

export default Com