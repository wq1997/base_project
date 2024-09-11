import SchematicDiagram from "./SchematicDiagram";

const Index = () => {
    return (
        <div 
            style={{
                width: '100%', 
                height: '100%', 
                position: 'relative',
                background:'#F5F9FE'
            }}
        >
           <div style={{fontSize:'22px'}}>嘉蕴</div>
           <div
                style={{
                    width: '100%', 
                    height: '100%', 
                    position: 'absolute',
                    left: '50%',
                    top: '65%',
                    transform: 'translate(-50%, -50%)'
                }}
           >
                <SchematicDiagram dataSource={{totalActivePower:1, power:-1, loadPower: 1}}/>
           </div>
        </div>
    );
};

export default Index;
