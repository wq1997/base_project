import { Button, Checkbox, Form, Input } from "antd";

const SearchInput = ({ label = '', placeholder = '', width = 200, }) => {
    return (
        <div>
            <span>{label}：</span>
            <Input style={{ width }} />
        </div>
    );
};

export default SearchInput;
