import bigScreenUrl from "./bigScreeen.gif";
import video from "./bigScreeen.mp4";

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
        <video  autoplay='autoplay'  loop='loop' >
            <source  width="100%" height="100%" src={video} type="video/mp4" />
        </video>
    );
};

export default Overview;
