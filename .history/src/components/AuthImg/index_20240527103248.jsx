import { Input, Select } from "antd";
import { useEffect, useRef } from "react";

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
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                console.log(imgRef)
                imgRef.src = URL.createObjectURL(request.response); // 将生成的blob对象的值赋值给img的src属性
                imgRef.onLoad = () => {
                    URL.revokeObjectURL(imgRef.src); // 在图片加载完成后释放
                };
            }
        };
        request.send(null);
    },[]);

    return <img ref={imgRef} style={{
        width:'200px',
        height:'30px'
    }}/>;
};

export default Index;
