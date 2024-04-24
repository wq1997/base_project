import bigScreenUrl from "./bigScreeen.gif";

const Overview = () => {
    return (
        <div>
            <img
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                src={bigScreenUrl} 
            />
        </div>
    )
}

export default Overview;