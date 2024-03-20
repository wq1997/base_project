import { Input } from "antd";

const SearchInput = ({ label = "", placeholder = "", inputWidth = 200 }) => {
    return (
        <div>
            <span>{label}：</span>
            {
                label && 
            }
            <Input style={{ width: inputWidth }} placeholder={placeholder} />
        </div>
    );
};

export default SearchInput;
