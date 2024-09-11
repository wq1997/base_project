import { Input, Select, DatePicker, theme } from "antd";
import styles from "./index.less";
import dayjs from "dayjs";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    type = "input",
    inputStyle = {},
    labelStyle = {},
    onChange = () => {},
}) => {
    const { token } = theme.useToken();
    return (
        <>
            {label && (
                <span style={{ marginRight: "8px", color: token.fontColor, ...labelStyle }}>
                    {label}
                </span>
            )}
            {type == "input" && (
                <Input
                    value={value}
                    style={{ ...inputStyle }}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    className={styles.input}
                />
            )}
             {type == "select" && (
                <Select
                    className={styles.input}
                    labelInValue={labelInValue}
                    mode={mode}
                    value={value}
                    defaultValue={value}
                    placeholder={placeholder || `请选择${label}`}
                    fieldNames={{
                        label: "name",
                        value: "code",
                    }}
                    allowClear={allowClear}
                    style={{ width: inputWidth, flex: 1, ...style }}
                    options={options}
                    onChange={value => onChange(value)}
                />
            )}
        </>
    );
};

export default SearchInput;
