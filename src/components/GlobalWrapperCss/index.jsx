import { useEmotionCss } from '@ant-design/use-emotion-css';

const GlobalWrapperCss = (props) => {
    const globalStyle = useEmotionCss(()=>{
        return {

        }
    })
    return (
        <div className={globalStyle}>
            {props.children}
        </div>
    )
}

export default GlobalWrapperCss;