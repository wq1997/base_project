import { getDvaApp } from "umi";
import { EXCAPE_TIME } from "./constants";

let timeOut = EXCAPE_TIME * 60 * 60;
let lastTime = new Date().getTime();
let currentTime = new Date().getTime();
let ICE_CONTAINER = document.getElementById('root');
let timeType = false;
 
const OvertimeLogin=()=> {
   let testTime=()=> {
        ICE_CONTAINER.addEventListener('mousemove', function() {
            lastTime = new Date().getTime();
        })
        timeType = window.location.href.indexOf('login') < 0;
        currentTime = new Date().getTime();
        console.log("currentTime", (currentTime - lastTime)/1000);
        if (currentTime - lastTime > timeOut) {
            if (timeType) {
				window.clearInterval(global.overtime)
				getDvaApp()._store.dispatch({
                    type: "user/logout",
                });
				lastTime = new Date().getTime();
		    } else {
		      lastTime = new Date().getTime();
		    }
        }
    }
	return testTime
}	
 
export default OvertimeLogin