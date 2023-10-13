import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search = (props) => {
    const { placeholder }=props;
    return (
        <Input placeholder={placeholder||"请输入关键字"} prefix={<SearchOutlined style={{color: '#ccc'}} />} {...props} />
    )
}

export default Search;