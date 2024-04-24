import bigScreenUrl from "./bigScreeen.gif";

const Overview = () => {
    return (
        <div>
            {/* <img
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                src={bigScreenUrl} 
            /> */}
            <video width="640" height="360" src="./bigScreeen.mp4"  controls>
             </video>
        </div>
    )
}

export default Overview;