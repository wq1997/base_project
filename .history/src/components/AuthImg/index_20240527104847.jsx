import { Input, Select } from "antd";
import { useEffect, useRef } from "react";

const Index = ({ url, token={localStorage.getItem("Token")} }) => {
    const imgRef = useRef();

    useEffect(() => {
        Object.defineProperty(Image.prototype, "url", {
            configurable: true,
            writable: true,
            enumerable: true,
        });
        let request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("get", url, true);
        request.setRequestHeader("token", token);
        request.onreadystatechange = e => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                imgRef.current.src = URL.createObjectURL(request.response); // 将生成的blob对象的值赋值给img的src属性
                console.log(URL.createObjectURL(request.response));
                imgRef.current.onLoad = () => {
                    URL.revokeObjectURL(imgRef.current.src); // 在图片加载完成后释放
                };
            }
        };
        request.send(null);
    }, [url]);

    return <img ref={imgRef} />;
};

export default Index;
