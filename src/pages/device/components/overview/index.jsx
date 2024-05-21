import OverViewOne from "./overview_1.0";
import OverViewTwo from "./overview_2.0";

const OverView = (props) => {
    return (
        <>
            {props.deviceVersion===7&&<OverViewOne deviceVersion={props.deviceVersion} />}
            {props.deviceVersion===15&&<OverViewTwo deviceVersion={props.deviceVersion} />}
        </>
    )
}

export default OverView;