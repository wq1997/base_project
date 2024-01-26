import { createFromIconfontCN } from '@ant-design/icons';

const useIcon = () => {
    return createFromIconfontCN({
        scriptUrl: [
          '//at.alicdn.com/t/c/font_2123098_h5icqgxdv68.js',
          '//at.alicdn.com/t/c/font_4421442_vhu7fry5top.js'
        ],
    })
}

export default useIcon;