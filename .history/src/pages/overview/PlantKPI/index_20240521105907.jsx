 
import { useState } from "react";
import styles from "./index.less";
 
const Index = () => {

    const [datas,setDatas] = useState([
        {name:'当前功率',pic:'',data:'455.34',unit:'kW'},
        {name:'当日发电量',pic:'',data:'',unit:'度'},
        {name:'当日收益',pic:'',data:'',unit:'元'},
        {name:'累计发电量',pic:'',data:'',unit:'kW'},
        {name:'逆变器额定功率',pic:'',data:'',unit:'kW'},
        {name:'储能额定容量',pic:'',data:'',unit:'kW'},
    ])

    return (
        <div className={styles.container}>
             11111
        </div>
    );
};

export default Index;
