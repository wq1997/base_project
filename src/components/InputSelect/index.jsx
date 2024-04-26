import { Select } from "antd";
import { useState, useRef, useEffect } from "react";

const InputSelect = (props) => {
    const inputRef = useRef(null);
    const { value, options, onChange } = props;
    const [ myValue, setMyValue ] = useState(value||[]);
    const [ myOptions, setMyOptions] = useState(options||[]);
    const [ inputContent, setInputContent ] = useState('');

    const onMyChange = (value) => {
        setMyValue(value);
        onChange(value);
    }

    return (
        <Select 
            ref={inputRef}
            {...props} 
            value={myValue}
            mode="multiple" 
            options={myOptions}
            onChange={onMyChange} 
            filterOption={input => {
                setInputContent(input);
            }}
            onKeyDown={(e)=>{
                if(e.keyCode===13){
                    if(inputRef?.current) inputRef?.current?.blur();
                    setMyOptions([...myOptions, {label: inputContent, value: inputContent}]);
                    setMyValue([...myValue, inputContent]);
                    onChange([...myValue, inputContent])
                    setInputContent('');
                }
            }}
        />
    )
}

export default InputSelect;