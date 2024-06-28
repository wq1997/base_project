import { Input, Select } from "antd";
import styles from "./index.less";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    inputWidth,
    type = "input",
    options = [],
    mode,
    fieldNames = {
        label: "displayName",
        value: "name",
    },
    labelInValue = false,
    allowClear = true,
    onChange = () => {},
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            {label && <span>{label} </span>}
            {type == "input" ? (
                <Input
                    value={value}
                    style={{ width: inputWidth }}
                    placeholder={placeholder || `请输入${label}`}
                    onChange={e => onChange(e.target.value)}
                    className={styles.input}
                />
            ) : (
                <Select
                    className={styles.input}
                    labelInValue={labelInValue}
                    mode={mode}
                    value={value}
                    defaultValue={value}
                    placeholder={placeholder || `请选择${label}`}
                    allowClear={allowClear}
                    style={{ width: inputWidth, flex: 1 }}
                    fieldNames={fieldNames}
                    options={options}
                    onChange={value => onChange(value)}
                />
            )}
        </div>
    );
};

export default SearchInput;
