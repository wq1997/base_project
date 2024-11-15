import { Outlet, useDispatch, useSelector } from "umi";
import {
    Layout,
    Row,
    Avatar,
    Typography,
    Dropdown,
    Space,
    theme as antdTheme,
    Tooltip,
    Modal,
    Table,
    DatePicker,
    Button,
} from "antd";
import styles from "./commonLayout.less";
import useIcon from "@/hooks/useIcon";
import { SearchInput } from "@/components";
import { useEffect, useRef, useState } from "react";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { setLocalStorage, hasPerm, jsonToUrlParams } from "@/utils/utils";
import { ArrowDownOutlined } from "@ant-design/icons";
import { getDownloadTaskList as getDownloadTaskListServer } from "@/services";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { getBaseUrl } from "@/services/request";
import dayjs from "dayjs";

const { Header, Sider, Content } = Layout;

const CommonLayout = props => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const { user } = useSelector(state => state.user);
    const [showDownloadTaskList, setShowDownloadTaskList] = useState(false);
    const [downloadTaskList, setDownloadTaskList] = useState([]);
    const nameRef = useRef();
    const [name, setName] = useState();
    const statusRef = useRef();
    const [status, setStatus] = useState();
    const timeRef = useRef();
    const [time, setTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { title, MyMenu } = props;
    useEffect(() => {
        document.title = title;
        dispatch({
            type: "user/queryUser",
        });
    }, []);

    const changeTheme = theme => {
        setLocalStorage("theme", theme);
        dispatch({
            type: "global/changeTheme",
            payload: {
                theme,
            },
        });
    };

    const headerStyle = useEmotionCss(() => {
        return {
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            background: token.layoutTopBackColor,
            ".logo": {
                width: "143px",
                height: "15px",
                marginRight: "20px",
            },
            ".title": {
                margin: 0,
            },
        };
    });

    const siderStyle = useEmotionCss(() => {
        return {
            background: token.layoutLeftBackColor,
            ".siderContent": {
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            },
            ".ant-menu-submenu-title": {
                color: "#fff !important",
                "&:hover": {
                    color: "#fff",
                },
            },
            ".ant-menu-item-selected": {
                background: "linear-gradient( 270deg, rgba(7,47,59,0) 0%, #0ED7CF 100%)",
                ".anticon,a": {
                    color: "#fff",
                },
                "&:hover": {
                    color: "#fff",
                },
            },
        };
    });

    const getDownloadTaskList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const status = statusRef.current;
        const createDate = timeRef.current;
        const res = await getDownloadTaskListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                name,
                status,
                createDate,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDownloadTaskList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = undefined;
        setName();
        statusRef.current = undefined;
        setStatus();
        timeRef.current = undefined;
        setTime();
        getDownloadTaskList();
    };

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={headerStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <img src={logo} className={"logo"} /> */}
                        <Typography.Title
                            level={3}
                            className={"title"}
                            style={{
                                color: "#fff",
                                fontSize: "26px",
                                fontFamily: "DingTalk",
                            }}
                        >
                            {title}
                        </Typography.Title>
                    </div>
                    <Space size={20} align="center">
                        {hasPerm(user, "op:project_run_day_report_task_list") && (
                            <Tooltip title="下载任务列表">
                                <ArrowDownOutlined
                                    style={{
                                        cursor: "pointer",
                                        fontSize: 20,
                                        color: "rgb(15, 163, 158)",
                                    }}
                                    onClick={() => {
                                        setShowDownloadTaskList(true);
                                        getDownloadTaskList();
                                    }}
                                />
                            </Tooltip>
                        )}

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: (
                                            <Space
                                                size={10}
                                                align="center"
                                                onClick={() => dispatch({ type: "user/logout" })}
                                            >
                                                <span>登出</span>
                                            </Space>
                                        ),
                                    },
                                ],
                            }}
                            placement="bottom"
                        >
                            <Row align="middle">
                                <Avatar
                                    style={{
                                        backgroundColor: token.colorPrimary,
                                        verticalAlign: "middle",
                                        fontWeight: 700,
                                    }}
                                    size="middle"
                                >
                                    {user?.selfUser?.account?.substring(0, 1)?.toUpperCase()}
                                </Avatar>
                                <span
                                    style={{
                                        fontSize: 15,
                                        color: token.colorPrimary,
                                        marginLeft: 15,
                                    }}
                                >
                                    {user?.selfUser?.account}
                                </span>
                            </Row>
                        </Dropdown>
                    </Space>
                </Header>
                <Layout hasSider>
                    <Sider className={siderStyle} width={200}>
                        <div className={"siderContent"}>
                            <MyMenu />
                        </div>
                    </Sider>
                    <Content className={styles.content} style={{ background: token.color14 }}>
                        <div className={styles.inContent} style={{ background: token.color12 }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Modal
                title="任务列表"
                destroyOnClose={true}
                open={showDownloadTaskList}
                width={950}
                onCancel={() => {
                    setShowDownloadTaskList(false);
                    setDownloadTaskList([]);
                    handleReset();
                }}
                footer={null}
            >
                <Space className="search" size={10}>
                    <SearchInput
                        label="任务名称"
                        value={name}
                        onChange={value => {
                            nameRef.current = value;
                            setName(value);
                        }}
                    />
                    <SearchInput
                        style={{ width: 130 }}
                        label="状态"
                        value={status}
                        type="select"
                        options={[
                            { name: "进行中", code: "IN_PROGRESS" },
                            { name: "已完成", code: "COMPLETED" },
                            { name: "已失败", code: "FAILED" },
                        ]}
                        onChange={value => {
                            statusRef.current = value;
                            setStatus(value);
                        }}
                    />
                    <div>
                        <span style={{ marginRight: 5 }}>创建时间</span>
                        <DatePicker
                            onChange={(date, dateStr) => {
                                timeRef.current = dateStr;
                                setTime(dateStr);
                            }}
                            value={time ? dayjs(time) : null}
                        />
                    </div>

                    <Button
                        type="primary"
                        onClick={() => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            getDownloadTaskList();
                        }}
                    >
                        搜索
                    </Button>
                    <Button onClick={handleReset} type="primary" danger>
                        重置
                    </Button>
                </Space>
                <Table
                    rowKey="id"
                    dataSource={downloadTaskList}
                    columns={[
                        {
                            title: "任务名称",
                            dataIndex: "name",
                        },
                        {
                            title: "状态",
                            dataIndex: "statusZh",
                        },
                        {
                            title: "进度",
                            dataIndex: "progress",
                            render: (_, { progress }) => {
                                return <span>{progress}%</span>;
                            },
                        },
                        {
                            title: "创建时间",
                            dataIndex: "createdAt",
                        },
                        {
                            title: "操作",
                            dataIndex: "operate",
                            width: 100,
                            render: (_, { id, status }) => {
                                return (
                                    hasPerm(user, "op:project_run_day_report_export") &&
                                    status == "COMPLETED" && (
                                        <a
                                            style={{ color: "#EE7612" }}
                                            onClick={() => {
                                                window.open(
                                                    getBaseUrl() +
                                                        `/export-task/download-export/${id}` +
                                                        jsonToUrlParams({
                                                            access_token:
                                                                localStorage.getItem("Token"),
                                                        })
                                                );
                                            }}
                                        >
                                            下载
                                        </a>
                                    )
                                );
                            },
                        },
                    ]}
                    pagination={pagination}
                    onChange={pagination => {
                        paginationRef.current = pagination;
                        getDownloadTaskList();
                    }}
                ></Table>
            </Modal>
        </div>
    );
};

export default CommonLayout;
