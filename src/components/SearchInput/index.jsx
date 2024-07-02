import { Input, Select, DatePicker } from "antd";
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
    onChange = () => {},
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            {label && <span style={{ marginRight: "5px" }}>{label} </span>}
            {type == "input" && (
                <Input
                    value={value}
                    style={{ width: inputWidth }}
                    placeholder={placeholder || `请输入${label}`}
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
                    allowClear={allowClear}
                    style={{ width: inputWidth, flex: 1 }}
                    options={options}
                    onChange={value => onChange(value)}
                />
            )}
            {type == "picker" && (
                <DatePicker
                    className={styles.input}
                    placeholder={placeholder || `请选择${label}`}
                    style={{ width: inputWidth, flex: 1 }}
                    onChange={(date, dateStr) => {
                        onChange(dateStr);
                    }}
                    value={value ? dayjs(value) : null}
                />
            )}
            {type == "rangePicker" && (
                <DatePicker.RangePicker
                    className={styles.input}
                    placeholder={placeholder}
                    style={{ width: inputWidth, flex: 1 }}
                    onChange={(date, dateStr) => {
                        onChange(dateStr?.includes("") ? [] : dateStr);
                    }}
                    value={value && value.length > 0 ? [dayjs(value[0]), dayjs(value[1])] : []}
                />
            )}
        </div>
    );
};

export default SearchInput;
