import { Upload, Button, message, Tooltip, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const MyUpload = ({ url, files = [], onChange, maxCount = 3, maxSizeMB = 10 }) => {
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
                fileList={newFiles?.map(item => ({
                    ...item,
                    name: item.fileName,
                }))}
                maxCount={maxCount}
                beforeUpload={file => {
                    if (file.size / 1024 / 1024 > maxSizeMB) {
                        message.info(`文件大小超出${maxSizeMB}MB限制`);
                        return Upload.LIST_IGNORE;
                    }
                }}
                onChange={info => {
                    if (info.file.status === "done") {
                        message.success("上传成功");
                        const newFiles = info?.fileList?.map(item => ({
                            ...item?.response?.data,
                            name: item?.response?.data?.fileName,
                        }));
                        onChange(newFiles);
                    } else if (info.file.status === "error") {
                        message.error("上传失败");
                    }
                    setNewFiles(info?.fileList);
                }}
            >
                <Tooltip title={`最大上传数量为${maxCount}，单个文件大小不超过${maxSizeMB}MB`}>
                    <Button>点击上传</Button>
                </Tooltip>
            </Upload>
        </>
    );
};

export default MyUpload;
