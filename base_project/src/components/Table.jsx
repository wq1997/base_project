import { Button, Dropdown,Table  } from "antd"
const Tables = (props) => {
    const {columns,data,pagination,scroll}=props;
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            scroll={scroll}
        />
    )
}

export default Tables