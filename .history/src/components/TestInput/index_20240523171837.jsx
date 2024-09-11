import React, { useState } from "react";
import { AutoComplete } from "antd";

const TestInput = ({ list }) => {
    const [value, setValue] = useState();
    const [anotherOptions, setAnotherOptions] = useState(
        list?.map(item => ({
            value: item,
        }))
    );
    const getPanelValue = searchText => {
        return;
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
                onSearch={text =>
                    setAnotherOptions(list.filter(item => item?.value?.includes(searchText)))
                }
                onChange={onChange}
                placeholder="control mode"
            />
        </>
    );
};
export default TestInput;
