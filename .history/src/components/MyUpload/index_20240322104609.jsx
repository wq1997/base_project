import { Upload, Button, message, Tooltip, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const defaultFiles = [];

const MyUpload = ({ url, files = defaultFiles, onChange, maxCount = 3, maxSizeMB = 10 }) => {
    const [newFiles, setNewFiles] = useState([]);

    useEffect(() => {
        setNewFiles(files);
    }, [files]);

    return (
        <>
            <Upload
                action={url}
                headers={{
                    Authorization: localStorage.getItem("Token"),
                }}
                fileList={newFiles}
                maxCount={maxCount}
                beforeUpload={file => {
                   
                    if (file.size / 1024 / 1024 > maxSizeMB) {
                        message.info(`文件大小超出${maxSizeMB}MB限制`);
                        return Upload.LIST_IGNORE;
                    }
                }}
                onChange={info => {
                    console.log(111111111)
                    let newFiles = info?.fileList;
                    if (info.file.status === "done") {
                        message.success("上传成功");
                        newFiles = newFiles?.map(item => ({
                            ...item?.response?.data,
                            name: item?.response?.data?.fileName,
                            ...item,
                        }));
                    } else if (info.file.status === "error") {
                        message.error("上传失败");
                    }
                    onChange(newFiles);
                    setNewFiles(newFiles); //这里必须要重新set一下解决onChange只执行一次问题 fileList默认值的原因
                }}
            >
                <Tooltip title={`最多上传${maxCount}个文件，单个文件大小不超过${maxSizeMB}MB`}>
                    <Button>点击上传</Button>
                </Tooltip>
            </Upload>
        </>
    );
};

export default MyUpload;
