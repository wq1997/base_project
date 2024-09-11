import React, { useState } from "react";
import { AutoComplete } from "antd";

const InputSelect = ({ placeholder, list }) => {
    list = list?.map(item => ({
        value: item,
    }));

    const [value, setValue] = useState();
    const [options, setOptions] = useState(list);

    const onSearch = text => {
        const newList = list.filter(item => item?.value?.includes(text));
        setOptions(newList);
    };

    const onChange = data => {
        setValue(data);
    };

    return (
        <>
            <AutoComplete
                placeholder={placeholder}
                value={value}
                options={options}
                onSearch={text => onSearch(text)}
                onChange={onChange}
            />
        </>
    );
};
export default InputSelect;
