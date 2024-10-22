import { Table, theme, Row } from "antd";
import styles from "./index.less";
import { useState, useEffect } from "react";
import { workbenchGetProjectSummery as workbenchGetProjectSummeryServe } from "@/services";
import { SearchInput } from "@/components";

const PersonnelTasks = ({ data }) => {
    const { token } = theme.useToken();
    const [region, setRegion] = useState();
    const [dataSource, setDataSource] = useState();

    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "项目阶段",
            dataIndex: "phaseZh",
            key: "phaseZh",
        },
        {
            title: "项目进度",
            dataIndex: "subPhaseZh",
            key: "subPhaseZh",
        },
        {
            title: "项目类型",
            dataIndex: "typeZh",
            key: "typeZh",
        },
        {
            title: "关联工单数",
            dataIndex: "refWorkOrderCount",
            key: "refWorkOrderCount",
        },
        {
            title: "在途工单数",
            dataIndex: "waitCompleteWorkOrderCount",
            key: "waitCompleteWorkOrderCount",
        },
    ];

    const getDataSource = async () => {
        const res = await workbenchGetProjectSummeryServe({
            regions: region,
            needProjectDetail: true,
        });
        if (res?.data?.status === "SUCCESS") {
            setDataSource(res?.data?.data);
        }
    };

    useEffect(() => {
        getDataSource();
    }, [region]);

    return (
        <div className={styles.personnelTasks} style={{ background: token.color12 }}>
            <Row justify="space-between" style={{ padding: 10 }}>
                <span style={{ fontSize: 17 }}>负责项目统计</span>
                <SearchInput
                    label="区域"
                    type="select"
                    value={region}
                    options={data?.regions}
                    onChange={setRegion}
                    mode="multiple"
                    style={{ width: 300 }}
                />
            </Row>
            <div className={styles.content}>
                <Table
                    dataSource={dataSource?.projects || []}
                    columns={columns}
                    style={{ width: "100%" }}
                />
            </div>
        </div>
    );
};

export default PersonnelTasks;
