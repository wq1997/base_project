import { Input, Select, DatePicker, theme } from "antd";
import styles from "./index.less";
import dayjs from "dayjs";

const SearchInput = ({
    label = undefined,
    value = undefined,
    placeholder = undefined,
    inputWidth,
    type = "input",
    options = [],
    mode,
    labelInValue = false,
    allowClear = true,
    style = {},
    onChange = () => {},
}) => {
    const { token } = theme.useToken();
    return (
        <>
            
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
