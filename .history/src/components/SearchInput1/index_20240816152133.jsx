import { Input, Select, DatePicker, theme } from "antd";
import styles from "./index.less";
import dayjs from "dayjs";

const SearchInput = ({
    inputStyle = {},
    labelStyle = {},
    label = undefined,
    value = undefined,
    placeholder = undefined,
    type = "input",
    labelInValue = false,
    allowClear = true,
    mode = "",
    options = [],
    onSearch={},
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
                    onSearch={onSearch}
                    className={styles.input}
                    enterButton="Search"
                />
            )}
            {type == "select" && (
                <Select
                    className={styles.input}
                    labelInValue={labelInValue}
                    mode={mode}
                    value={value}
                    defaultValue={value}
                    placeholder={placeholder}
                    fieldNames={{
                        label: "name",
                        value: "code",
                    }}
                    allowClear={allowClear}
                    style={{ ...inputStyle }}
                    options={options}
                    onChange={value => onChange(value)}
                />
            )}
        </>
    );
};

export default SearchInput;
