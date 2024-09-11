import { Input, Select } from "antd";
import { useEffect } from "react";

const Index = ({ url, token }) => {
    
    useEffect(() => {
        Object.defineProperty(Image.prototype, "imgurl", {
            configurable: true,
            writable: true,
            enumerable: true,
        });
        let request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("get", this.imgUrl, true);
        request.setRequestHeader("token", this.authToken);
        let imgRef = this.$ref.authImg;
        request.onreadystatechange = e => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                imgRef.src = URL.createObjectURL(request.response); // 将生成的blob对象的值赋值给img的src属性
                imgRef.onLoad = () => {
                    URL.revokeObjectURL(imgRef.src); // 在图片加载完成后释放
                };
            }
        };
        request.send(null);
    });

    return  <img ref="authImg" />
};

export default Index;
