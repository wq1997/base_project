import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import arrow from "../images/标题底框.svg";

const Index = () => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>告警列表</div>
            <div className={styles.list}>
            <Space className="search">
                <SearchInput
                    label="公司"
                    value={name}
                    inputWidth={250}
                    placeholder="请输入公司名称或公司编号"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <Button type="primary" onClick={getCompanyList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={companyList}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.code === "SERMATEC",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getCompanyList();
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:company_add") && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setAddCompanyOpen(true)}
                            >
                                新增公司
                            </Button>
                        )}
                        {hasPerm(user, "op:company_delete") && (
                            <Button type="primary" danger onClick={handleDelete}>
                                删除公司
                                {selectedRowKeys?.length ? (
                                    <span>（{selectedRowKeys?.length}）</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        )}
                    </Space>
                )}
            ></Table>
            </div>
        </div>
    );
};

export default Index;
