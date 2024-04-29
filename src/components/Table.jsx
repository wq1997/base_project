import { Table  } from "antd"
const Tables = (props) => {
    const {columns,data,pagination, ...rest}=props;
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            {...rest}
        />
    )
}

export default Tables