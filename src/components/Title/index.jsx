import { Typography } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';

const PageTitle = (props) => {
    const {title} = props;
    return <Typography.Title level={3} {...props}>{title}</Typography.Title>
}

const PageSubTitle = (props) => {
    const {title} = props;
    const pageSubTitleStyle = useEmotionCss(({token})=>{
        return {
            fontWeight: 600,
            fontSize: 17,
            "&:before": {
                display: 'inline-block',
                width: '4px',
                height: '18px',
                background: token.colorPrimary,
                content: '""',
                position: 'relative',
                top: '3px',
                marginRight: '5px'
            }
        }
    })
    return (
        <div className={pageSubTitleStyle}>{title}</div>
    )
}

const Title = {
    PageTitle,
    PageSubTitle
}

export default Title;