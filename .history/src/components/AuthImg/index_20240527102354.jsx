import { Input, Select } from "antd";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    inputWidth = 200,
    type = "input",
    options = [],
    fieldNames = {
        label: "displayName",
        value: "name",
    },
    onChange = () => {},
}) => {
    return (
        <div style={{ margin: 8, whiteSpace: "nowrap" }}>
            {label && <span>{label}：</span>}
            {type == "input" ? (
                <Input
                    value={value}
                    style={{ width: inputWidth }}
                    placeholder={placeholder || `请输入${label}`}
                    onChange={e => onChange(e.target.value)}
                />
            ) : (
                <Select
                    value={value}
                    placeholder={placeholder || `请选择${label}`}
                    allowClear={true}
                    style={{ width: inputWidth }}
                    fieldNames={fieldNames}
                    options={options}
                    onChange={value => onChange(value)}
                />
            )}
        </div>
    );
};

export default SearchInput;
