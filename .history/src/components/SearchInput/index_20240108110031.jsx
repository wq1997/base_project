import { Input } from "antd";

const SearchInput = ({ label = undefined, value = undefined, placeholder = undefined, inputWidth = 200 }) => {
    return (
        <div style={{ margin: 8 }}>
            {label && <span>{label}：</span>}
            <Input style={{ width: inputWidth }} placeholder={placeholder} />
        </div>
    );
};

export default SearchInput;
