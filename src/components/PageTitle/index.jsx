import { Typography } from "antd";

const PageTitle = ({
    level = 3,
    title = "",
    type,
    style
}) => {
    return (
        <Typography.Title 
            level={level} 
            style={{
                margin: 0, 
                marginBottom: type==="page"?20:0,
                ...style
            }}
        >
           {title}
        </Typography.Title>
    )
}

export default PageTitle;