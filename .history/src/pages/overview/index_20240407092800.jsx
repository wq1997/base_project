import bigScreenUrl from "./bigScreeen.gif";
import video from './bigScreeen.mp4'

const Overview = () => {
    return (
        // <div>
        //     <img
        //         style={{
        //             width: '100%',
        //             height: '100%',
        //             objectFit: 'cover'
        //         }}
        //         src={bigScreenUrl}
        //     />
        // </div>
        <video width="100%" height="100%" autoplay={true} loop={true}>
            <source src={video} type="video/mp4" autoplay={true} loop={true}/>
        </video>
    )
}

export default Overview;