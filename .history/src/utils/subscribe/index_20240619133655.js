import "./lib/stomp.js";
import "./lib/sockjs.js";
import "./lib/modernizr-3.3.1.min.js";

import typeParams from "./typeParams";
const getToken = () => localStorage.getItem("Token");

let client = null,
    token = getToken();

const DisSocket = function () {
    client && client.disconnect("", token);
    client = null;
};
let socketURL = process.env.API_URL_1,
subURL='',
topicURL=''
// let socketURL = "ws://192.168.1.82:8088";

const connectSocket = function (ids, resultCallback) {
    DisSocket();
    let { subURL, topicURL, progressTopicURL, commandIds } = typeParams[type],
        socketObj = new SockJS("/topic/device-config/ws/device-config");
    client = Stomp.over(socketObj);
    let payload = JSON.stringify({ message: "Marco!" });
    client.connect({ token }, () => {
        ids.forEach(cid => {
            let parmarsUrl = (parmarsUrl = `${topicURL}/${token}/${cid}`);
            client.send(parmarsUrl, payload);
            client.subscribe(
                parmarsUrl,
                result => {
                    resultCallback(JSON.parse(result.body));
                },
                { token }
            );
        });
    });
};

export { connectSocket };
