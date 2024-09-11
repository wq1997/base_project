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
            {label && <span style={{ marginRight: "8px", color: token.fontColor }}>{label} </span>}
            {type == "input" && (
                <Input
                    value={value}
                    style={{ width: inputWidth, ...style }}
                    placeholder={placeholder || `请输入${label}`}
                    onChange={e => onChange(e.target.value)}
                    className={styles.input}
                />
            )}
        </>
    );
};

export default SearchInput;
