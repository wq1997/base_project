import { Button, Dropdown } from "antd"
import { useDispatch } from "umi"
const LocaleBtn = () => {
    const dispatch = useDispatch()
    const items = [
        {
            key: 'dark',
            label: (
                <span 
                    onClick={()=>{
                        changeTheme("zh-CN");
                    }}>
                    中文
                </span>
            )
        },
        {
            key: 'white',
            label: <span onClick={()=>changeTheme("en-US")}>英文</span>
        }
    ]
    const changeTheme=(locale)=>{
        dispatch({
            type: 'global/changeLanguage',
            payload:{
                locale
            }
        })
    }
    return (
        <Dropdown menu={{ items }} placement="bottom">
            <Button>切换语言</Button>
        </Dropdown>
    )
}

export default LocaleBtn