import { createFromIconfontCN } from '@ant-design/icons';
import { ICON_PATH } from "@/utils/constants"
const useIcon = () => {
    return createFromIconfontCN({
        scriptUrl: [
            ICON_PATH
        ],
    })
}

export default useIcon;