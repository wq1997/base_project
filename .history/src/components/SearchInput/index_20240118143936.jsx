import { Input } from "antd";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    inputWidth = 200,
    type='input',
    onChange = () => { },
}) => {
    return (
        <div style={{ margin: 8, whiteSpace: 'nowrap' }}>
            {label && <span>{label}：</span>}
            {
                type =='input'? <Input
                value={value}
                style={{ width: inputWidth }}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
            />:
            }
           
        </div>
    );
};

export default SearchInput;
