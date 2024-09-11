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
const socketURL = process.env.API_URL_1,
    subURL = "/ws/device-config1",
    topicURL = "/topic/device-config";

const connectSocket = function (ids, resCallback) {
    disconnectSocket();
    client = Stomp.over(new SockJS(socketURL + subURL));
    client.connect({ token }, res => {
        console.log("res", res);
        ids.forEach(cid => {
            const destination = 
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
