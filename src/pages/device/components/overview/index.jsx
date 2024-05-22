import OverViewOne from "./overview_1.0";
import OverViewTwo from "./overview_2.0";

const OverView = (props) => {
    return (
        <>
            {props.deviceVersion===7&&<OverViewOne sn={props?.sn} deviceVersion={props.deviceVersion} />}
            {props.deviceVersion===15&&<OverViewTwo sn={props?.sn} deviceVersion={props.deviceVersion} />}
        </>
    )
}

export default OverView;