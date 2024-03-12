import { Card } from "antd";

const CardPage = (props) => {
    const { style } = props;
    return (
        <Card
            style={{
                minHeight: 'calc(100vh - 80px)',
                ...style
            }}
        >
            {props.children}
        </Card>
    )
}

export default CardPage;