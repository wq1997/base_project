import { Button, Dropdown,Table  } from "antd"
const Tables = (props) => {
    const {columns,data,pagination}=props;
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
        />
    )
}

export default Tables