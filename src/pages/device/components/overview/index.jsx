import { theme } from "antd";

const OverView = () => {
    const { token } = theme.useToken();
    return (
        <div style={{width: '100%', height: 'auto', minHeight: '100%', padding: '40px 30px',  background: token.bgcColorB_l}}>
            总览
        </div>
    )
}

export default OverView;