import React, { useState } from "react";
import { AutoComplete } from "antd";

const TestInput = ({ list }) => {
    const [value, setValue] = useState();
    const [anotherOptions, setAnotherOptions] = useState(
        list?.map(item => ({
            value: item,
        }))
    );

    const onSearch = text => {
        console.log('list',list)
        const newList = list.filter(item => item?.value?.includes(text));
        console.log(text, newList);
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
