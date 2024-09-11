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
    subURL = "/ws/device-config",
    topicURL = "/topic/device-config";

const connectSocket =  (ids, { successCallback, failCallback }, resultCallback) =>{
    disconnectSocket();
    client = Stomp.over(new SockJS(socketURL + subURL));
    console.log("client", client);
    client.connect(
        { token },
        connectCallback => {
            successCallback();
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
            failCallback();
        }
    );
};

export { connectSocket };
