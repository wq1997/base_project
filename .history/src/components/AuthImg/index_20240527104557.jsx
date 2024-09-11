import { Image as AntdImage } from "antd";
import React, { useEffect, useRef } from "react";

const Index = ({ url, token }) => {
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
            const AntdImage = document.getElementById("AntdImage");
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                AntdImage.src = URL.createObjectURL(request.response); // 将生成的blob对象的值赋值给img的src属性
                console.log(URL.createObjectURL(request.response));
                AntdImage.onLoad = () => {
                    URL.revokeObjectURL(AntdImage.src); // 在图片加载完成后释放
                };
            }
        };
        request.send(null);
    }, [url]);

    return <AntdImage id="AntdImage" />;
};

export default Index;
