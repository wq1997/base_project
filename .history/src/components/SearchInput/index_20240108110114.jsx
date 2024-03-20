import { Input } from "antd";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    inputWidth = 200,
}) => {
    return (
        <div style={{ margin: 8 }}>
            {label && <span>{label}：</span>}
            <Input value={value} style={{ width: inputWidth }} placeholder={placeholder} onChange={e=>{
                console.log(e)
            }}/>
        </div>
    );
};

export default SearchInput;
