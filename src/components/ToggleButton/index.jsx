import { Button } from "antd"
import { useState } from "react";

const ToggleButton = ({
    freezeTime,
    children,
    onClick,
    ...rest
}) => {
    const [disabled, setDisabled] = useState(false);

    const onMyClick = () => {
        setDisabled(true);
        onClick();
        setTimeout(()=>{
            setDisabled(false);
        }, freezeTime * 1000)
    }

    return (
        <Button {...rest} disabled={disabled} onClick={onMyClick}>{children}</Button>
    )
}

export default ToggleButton;