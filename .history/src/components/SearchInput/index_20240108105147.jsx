import { Input } from "antd";

const SearchInput = ({ label = "", placeholder = "", inputWidth = 200 }) => {
    return (
        <div>
            {label && <span>{label}：</span>}
            <Input style={{ width: inputWidth }} placeholder={placeholder} />
        </div>
    );
};

export default SearchInput;
