import "./lib/stomp.js";
import "./lib/sockjs.js";
import "./lib/modernizr-3.3.1.min.js";

import typeParams from "./typeParams";
const getToken = () => localStorage.getItem("Token");

let client = null,
    token = getToken();

const disSocket = function () {
    client && client.disconnect("", token);
    client = null;
};
let socketURL = process.env.API_URL_1,
    topicURL = "/topic/device-config",
    subURL = "/ws/device-config";

const connectSocket = function (ids, resultCallback) {
    disSocket();
    let socketObj = new SockJS(topicURL + subURL);
    client = Stomp.over(socketObj);
    let payload = JSON.stringify({ message: "Marco!" });
    client.connect({ token }, () => {
        ids.forEach(cid => {
            let url = `${topicURL}/${token}/${cid}`;
            client.send(url, payload);
            client.subscribe(
                url,
                result => {
                    resultCallback(JSON.parse(result.body));
                },
                { token }
            );
        });
    });
};

export { connectSocket };
