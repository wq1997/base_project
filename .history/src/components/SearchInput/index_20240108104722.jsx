import { Button, Checkbox, Form, Input } from "antd";

const SearchInput = ({ label, }) => {
    return (
        <div>
            <span>平台名称：</span>
            <Input style={{ width: 200 }} />
        </div>
    );
};

export default SearchInput;