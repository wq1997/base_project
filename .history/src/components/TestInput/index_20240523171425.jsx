import React, { useState } from "react";
import { AutoComplete } from "antd";
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

const baseOptions = [{ value: "采日" }, { value: "采日能源" }];

const TestInput = ({ list }) => {

   console.log(list)

    const [value, setValue] = useState();
    const [anotherOptions, setAnotherOptions] = useState(options);
    const getPanelValue = searchText => {
        return baseOptions.filter(item => item?.value?.includes(searchText));
    };

    const onSelect = data => {
        console.log("onSelect", data);
    };
    const onChange = data => {
        setValue(data);
        console.log("onChange", data);
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
