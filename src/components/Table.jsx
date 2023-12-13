import {  Table } from "antd"
const Tables = (props) => {
    const { columns, data } = props;
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>

    )
}

export default Tables