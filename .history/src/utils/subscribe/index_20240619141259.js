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

const connectSocket = function (ids, resultCallback,errorCallback) {
    disconnectSocket();
    client = Stomp.over(new SockJS(socketURL + subURL));
    console.log("client", client);
    client.connect(
        { token },
        connectCallback => {
            ids.forEach(cid => {
                const destination = `${topicURL}/${token}/${cid}`;
                client.subscribe(
                    destination,
                    result => {
                        resultCallback(JSON.parse(result.body));
                    },
                    { token }
                );
            });
        },
        errorCallback => {
            console.log("err");
        }
    );
};

export { connectSocket };
