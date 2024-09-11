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
let socketURL = process.env.API_URL_1;
// let socketURL = "ws://192.168.1.82:8088";

const connectSocket = function (ids, resultCallback) {
    DisSocket();
    let { subURL, topicURL, progressTopicURL, commandIds } = typeParams[type],
        socketObj = new SockJS(socketURL + subURL);
    client = Stomp.over(socketObj);
    let payload = JSON.stringify({ message: "Marco!" });
    client.connect({ token }, () => {
        commandIds.forEach(cid => {
            let parmarsUrl;
            if (cid === "progress") {
                parmarsUrl = `${progressTopicURL}/${token}`;
            } else {
                parmarsUrl = `${topicURL}/${token}/${cid}`;
            }
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
