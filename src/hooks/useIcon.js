import { createFromIconfontCN } from '@ant-design/icons';

const useIcon = () => {
    return createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/c/font_4191866_3labaar6ws3.js',
            '//at.alicdn.com/t/c/font_4421442_86sw4btnq37.js',  // UI提供的Icon
        ],
    })
}

export default useIcon;