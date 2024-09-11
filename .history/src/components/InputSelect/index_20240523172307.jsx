import React, { useState } from "react";
import { AutoComplete } from "antd";

const TestInput = ({ list }) => {
    list = list?.map(item => ({
        value: item,
    }));

    const [value, setValue] = useState();
    const [anotherOptions, setAnotherOptions] = useState(list);

    const onSearch = text => {
        const newList = list.filter(item => item?.value?.includes(text));
        setAnotherOptions(newList);
    };

    const onChange = data => {
        setValue(data);
    };

    return (
        <>
            <AutoComplete
                value={value}
                options={anotherOptions}
                onSearch={text => onSearch(text)}
                onChange={onChange}
                placeholder="control mode"
            />
        </>
    );
};
export default TestInput;
