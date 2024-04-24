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
        <video width="100%"   autoplay='autoplay'  loop='loop' >
            <source src={video} type="video/mp4" />
        </video>
    );
};

export default Overview;
