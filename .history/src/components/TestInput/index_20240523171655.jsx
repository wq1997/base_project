import React, { useState } from "react";
import { AutoComplete } from "antd";
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

const baseOptions = [{ value: "采日" }, { value: "采日能源" }];

const TestInput = ({ list }) => {
    const [value, setValue] = useState();
    const [anotherOptions, setAnotherOptions] = useState(list);
    const getPanelValue = searchText => {
        return list.filter(item => item?.includes(searchText));
    };

    const onChange = data => {
        setValue(data);
    };
    return (
        <>
            <AutoComplete
                value={value}
                options={anotherOptions}
                style={{
                    width: 200,
                }}
                onSelect={onSelect}
                onSearch={text => setAnotherOptions(getPanelValue(text))}
                onChange={onChange}
                placeholder="control mode"
            />
        </>
    );
};
export default TestInput;
