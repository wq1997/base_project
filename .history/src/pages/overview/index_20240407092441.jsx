import bigScreenUrl from "./bigScreeen.gif";
import video from './bigScreeen.mp4'

const Overview = () => {
    return (
        <video width="100%" height="100%" autoplay loop>
                <source src={video} type="video/mp4" />
            </video>
    )
}

export default Overview;