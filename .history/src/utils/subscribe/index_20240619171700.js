import "./lib/stomp.js";
import "./lib/sockjs.js";
import "./lib/modernizr-3.3.1.min.js";
 
let client = null,
    token = localStorage.getItem("Token")

const disconnectSocket = function () {
    client && client.disconnect("", token);
    client = null;
};
const socketURL = process.env.API_URL_1,
    subURL = "/ws/device-config",
    topicURL = "/topic/device-config";

const connectSocket = (ids, successCallback, failCallback) => {
    disconnectSocket();
    client = Stomp.over(new SockJS(socketURL + subURL));
    client.connect(
        { token },
        connectCallback => {
            successCallback();
            ids.forEach(cid => {
                const destination = `${topicURL}/${token}/${cid}`;
                client.subscribe(
                    destination,
                    result => {
                        successCallback(JSON.parse(result.body));
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
