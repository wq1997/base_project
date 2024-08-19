import "@/lib/socket/stomp.js";
import "@/lib/socket/sockjs.js";
import "@/lib/socket/modernizr-3.3.1.min.js";

// import { socketURL } from "../../../apiUrl";
import typeParams from "./typeParams";
// import { getToken } from "@u/common";
const getToken = () => localStorage.getItem("Token");

let client = null,
    token = getToken();

const DisSocket = function () {
    client && client.disconnect("", token);
    client = null;
};
// let socketURL='http://192.168.1.42:9999'
let socketURL='https://abroad-power.sermatec-cloud.com'

const connectSocket = function (type, connectedCallback, resultCallback) {
    DisSocket();
    if (type === "" || typeof type !== "string")
        throw new TypeError("type must be an not empty string");
    if (typeParams[type] === undefined) throw new Error(`暂不支持订阅${type}类型`);
    let { subURL, topicURL, progressTopicURL, commandIds } = typeParams[type],
        socketObj = new SockJS(socketURL + subURL);
    client = Stomp.over(socketObj);
    let payload = JSON.stringify({'message':'Marco!'});
    if (!Array.isArray(commandIds)) commandIds = [commandIds];
    client.connect({ token:getToken() }, () => {
        connectedCallback();
        commandIds.forEach(cid => {
            let parmarsUrl;
            if (cid === "progress") {
                parmarsUrl = `${progressTopicURL}/${token}`;
            } else {
                parmarsUrl = `${topicURL}/${token}/${cid}`;
            }
            client.send(parmarsUrl,payload)
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
