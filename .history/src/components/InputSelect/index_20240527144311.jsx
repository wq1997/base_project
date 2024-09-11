import React, { useState } from "react";
import { AutoComplete } from "antd";

const InputSelect = ({ defaultValue,placeholder, list = [], onChange }) => {
    list = list?.map(item => ({
        value: item,
    }));

    const [value, setValue] = useState();
    const [options, setOptions] = useState(list);

    const handleSearch = text => {
        const newList = list?.filter(item => item?.value?.includes(text));
        setOptions(newList);
    };

    const handleChange = data => {
        setValue(data);
        onChange(data);
    };

    return (
        <>
            <AutoComplete
                placeholder={placeholder}
                value={value}
                options={options}
                onSearch={handleSearch}
                onChange={handleChange}
            />
        </>
    );
};
export default InputSelect;
