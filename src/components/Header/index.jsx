import { Typography, Button, Space } from "antd";
import { Title } from "@/components";
import styles from "./index.less";

const { Paragraph } = Typography;

const Header = ({
    title,
    description,
    actions
}) => {
    return (
        <div className={styles.header}>
            <Title.PageTitle title={title} style={{marginTop: 0}} />
            <Paragraph>{description}</Paragraph>
            <Space>
                {
                    actions?.map(action => {
                        return (
                            <Button type="primary" onClick={action.onClick}>{action?.title}</Button>
                        )
                    })
                }
            </Space>
        </div>
    )
}

export default Header;