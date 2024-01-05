import { Button, Dropdown,Table  } from "antd"
const Tables = (props) => {
    const {columns,data}=props;
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    )
}

export default Tables