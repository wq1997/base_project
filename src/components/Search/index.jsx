import { Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

const Search = (props) => {
    return (
        <Input prefix={<SearchOutlined />} {...props} />
    )
}

export default Search;