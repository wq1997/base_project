import "./lib/stomp.js";
import "./lib/sockjs.js";
import "./lib/modernizr-3.3.1.min.js";

import typeParams from "./typeParams";
const getToken = () => localStorage.getItem("Token");

let client = null,
    token = getToken();

const disconnectSocket = function () {
    client && client.disconnect("", token);
    client = null;
};
let socketURL = process.env.API_URL_1,
    topicURL = "/topic/device-config",
    subURL = "/ws/device-config";

const connectSocket = function (ids, resCallback) {
    disconnectSocket();
    let socketObj = new SockJS(topicURL + subURL);
    client = Stomp.over(socketObj);
    client.connect({ token }, (res) => {
        console.log()
        ids.forEach(cid => {
            client.subscribe(
                `${topicURL}/${token}/${cid}`,
                result => {
                    resCallback(JSON.parse(result.body));
                },
                { token }
            );
        });
    });
};

export { connectSocket };
