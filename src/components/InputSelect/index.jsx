import { Select, theme } from "antd";
import { useState, useRef } from "react";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { addColorAlpha } from "@/utils/utils";

const InputSelect = props => {
    const { token } = theme.useToken();
    const inputRef = useRef(null);
    const { value, options, onChange } = props;
    const [myValue, setMyValue] = useState(value || []);
    const [myOptions, setMyOptions] = useState(options || []);
    const [inputContent, setInputContent] = useState("");

    const onMyChange = value => {
        setMyValue(value);
        onChange(value);
    };

    const onMyBlur = () => {
        if (inputRef?.current) inputRef?.current?.blur();
    };

    const optionsItemStyle = useEmotionCss(() => {
        return {
            padding: "5px 0 5px 5px",
            cursor: "pointer",
            marginBottom: "5px",
            "&:hover": {
                background: addColorAlpha("#000000", 0.05),
            },
        };
    });

    return (
        <Select
            ref={inputRef}
            {...props}
            value={myValue}
            options={myOptions}
            onChange={onMyChange}
            filterOption={input => {
                setInputContent(input);
            }}
            dropdownRender={_ => {
                return options.map(item => {
                    return (
                        <div
                            key={item.value}
                            onClick={() => {
                                onMyChange(item.value);
                                onMyBlur();
                            }}
                            className={optionsItemStyle}
                            style={{
                                background:
                                    myValue === item.value &&
                                    addColorAlpha(token.colorPrimary, 0.05),
                                height: item.visible === false ? 0 : "auto",
                            }}
                        >
                            {item.label}
                        </div>
                    );
                });
            }}
            onBlur={() => {
                if (inputContent) {
                    onMyBlur();
                    setMyOptions([
                        ...myOptions,
                        { label: inputContent, value: inputContent, visible: false },
                    ]);
                    setMyValue(inputContent);
                    onChange(inputContent);
                    setInputContent("");
                }
            }}
        />
    );
};

export default InputSelect;
