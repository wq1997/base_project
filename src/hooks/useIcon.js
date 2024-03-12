import { createFromIconfontCN } from '@ant-design/icons';

const useIcon = () => {
    return createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/c/font_4191866_o58qt0w17r.js',
            '//at.alicdn.com/t/c/font_4421442_nu6yyxl02qf.js',  // UI提供的Icon
        ],
    })
}

export default useIcon;