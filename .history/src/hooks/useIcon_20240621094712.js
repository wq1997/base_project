import { createFromIconfontCN } from "@ant-design/icons";

const useIcon = (extraCommonProps) => {
    return createFromIconfontCN({
        scriptUrl: ["//at.alicdn.com/t/c/font_4591208_areyom6ltvo.js"],
        extraCommonProps
    });
};

export default useIcon;
