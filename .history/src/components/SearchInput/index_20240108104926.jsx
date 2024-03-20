import { Input } from "antd";

const SearchInput = ({ label = "", placeholder = "", inputWidth = 200 }) => {
    return (
        <div>
            <span>{label}：</span>
            <Input style={{ width }} placeholder={placeholder} />
        </div>
    );
};

export default SearchInput;
