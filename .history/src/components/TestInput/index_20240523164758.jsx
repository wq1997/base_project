import React, { useState } from "react";
import { AutoComplete } from "antd";
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});
const TestInput = () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [anotherOptions, setAnotherOptions] = useState([]);
    const getPanelValue = searchText =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
    const onSelect = data => {
        console.log("onSelect", data);
    };
    const onChange = data => {
        setValue(data);
    };
    return (
        <>
            <AutoComplete
                options={options}
                style={{
                    width: 200,
                }}
                onSelect={onSelect}
                onSearch={text => setOptions(getPanelValue(text))}
                placeholder="input here"
            />
            <br />
            <br />
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
