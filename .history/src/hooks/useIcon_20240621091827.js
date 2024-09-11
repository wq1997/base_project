import { createFromIconfontCN } from '@ant-design/icons';

const useIcon = () => {
    return createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/c/font_4191866_d1mfg6yoa7.js',
            '//at.alicdn.com/t/c/font_4591208_areyom6ltvo.css'
        ],
    })
}

export default useIcon;