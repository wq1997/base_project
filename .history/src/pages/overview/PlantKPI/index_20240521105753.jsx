 
import { useState } from "react";
import styles from "./index.less";
 
const Index = () => {

    const [datas,setDatas] = useState([
        {name:'当前功率',pic:'',data:''},
        {name:'当日发电量',pic:'',data:''},
        {name:'当日收益',pic:'',data:''},
        {name:'',pic:'',data:''},
        {name:'',pic:'',data:''},
        {name:'',pic:'',data:''},
    ])

    return (
        <div className={styles.container}>
             11111
        </div>
    );
};

export default Index;
