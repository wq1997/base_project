import { Button, Dropdown,Table  } from "antd"
import { useDispatch } from "umi"
const Tables = (props) => {
    const dispatch = useDispatch()
    console.log(props,11111111111);
    const {columns,data}=props;
    
     
    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )
}

export default Tables