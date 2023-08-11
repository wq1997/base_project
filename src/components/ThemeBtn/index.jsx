import { Button, Dropdown } from "antd"
import { useDispatch } from "umi"
const ThemeBtn = () => {
    const dispatch = useDispatch()
    const items = [
        {
            key: 'dark',
            label: (
                <span onClick={()=>{
                    changeTheme("dark");
                }}>黑色</span>
            )
        },
        {
            key: 'white',
            label: <span onClick={()=>changeTheme("default")}>默认</span>
        }
    ]
    const changeTheme=(theme)=>{
        dispatch({
            type: 'global/changeTheme',
            payload:{
                theme
            }
        })
    }
    return (
        <Dropdown menu={{ items }} placement="bottom">
            <Button>切换主题</Button>
        </Dropdown>
    )
}

export default ThemeBtn