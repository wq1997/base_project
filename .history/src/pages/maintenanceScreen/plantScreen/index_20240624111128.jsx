import { theme, Table, DatePicker } from "antd";
import { ThemeBtn, LocaleBtn } from "@/components";
import { useIntl } from "umi";

const Index = () => {
    const { token } = theme.useToken();
    const intl = useIntl();
    return (
        <div
            style={{
                background: token.colorPrimary,
                color: token.colorText,
            }}
        >
            <ThemeBtn />
            <LocaleBtn />
            <p>{intl.formatMessage({ id: "handsome" })}</p>
            <DatePicker />
            <Table
                columns={[
                    {
                        title: "name",
                        dataIndex: "name",
                        key: "name",
                    },
                ]}
                dataSource={[
                    {
                        name: "wq",
                    },
                ]}
                pagination={{
                    total: 20,
                    pageSize: 1,
                    showQuickJumper: true,
                }}
            />
        </div>
    );
};

export default Index;
