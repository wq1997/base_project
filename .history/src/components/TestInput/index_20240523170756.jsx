import React, { useState } from "react";
import { AutoComplete } from "antd";
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

const baseOptions = [
    { label: "采日", value: 1 },
    { label: "采日能源", value: 2 },
];

const TestInput = ({ options }) => {
    //console.log(options)
    const [value, setValue] = useState("");
    const [anotherOptions, setAnotherOptions] = useState(baseOptions);
    const getPanelValue = searchText => {
        console.log(baseOptions.filter(item => item?.label?.includes(searchText)));
        return !searchText
            ? []
            : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
    };

    const onSelect = data => {
        console.log("onSelect", data);
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
