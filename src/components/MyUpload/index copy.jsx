import { Upload, Button, message, Tooltip, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const MyUpload = ({ url, files = [], onChange, maxCount = 3, maxSizeMB = 10 }) => {
    const [newFiles, setNewFiles] = useState(files);

    const handleDelete = index => {
        if (index < files?.length) {
            files.splice(index, 1);
        } else {
            newFiles.splice(index - files?.length, 1);
            setNewFiles(newFiles);
        }
        onChange([...files, ...newFiles]);
    };

    return (
        <>
            <Upload
                action={url}
                headers={{
                    Authorization: localStorage.getItem("Token"),
                }}
                showUploadList={false}
                maxCount={maxCount}
                beforeUpload={file => {
                    if ([...files, ...newFiles]?.length == 3) {
                        message.info(`最多上传数量为${maxCount}`);
                        return Upload.LIST_IGNORE;
                    }
                    if (file.size / 1024 / 1024 > maxSizeMB) {
                        message.info(`文件大小超出${maxSizeMB}MB限制`);
                        return Upload.LIST_IGNORE;
                    }
                }}
                onChange={info => {
                    if (info.file.status === "done") {
                        message.success("上传成功");
                        const _newFiles = info.fileList?.map(item => item.response?.data);
                        setNewFiles(_newFiles);
                        console.log(files, _newFiles)
                        onChange([...files, ..._newFiles]);
                    } else if (info.file.status === "error") {
                        message.error("上传失败");
                    }
                }}
            >
                <Tooltip title={`最大上传数量为${maxCount}，单个文件大小不超过${maxSizeMB}MB`}>
                    <Button>点击上传</Button>
                </Tooltip>
            </Upload>
            {[...files, ...newFiles]?.map((file, index) => (
                <div style={{ display: "flex" }} key={index} onClick={() => handleDelete(index)}>
                    <span>{file?.fileName}</span>
                    <DeleteOutlined style={{ marginLeft: 8 }} />
                </div>
            ))}
        </>
    );
};

export default MyUpload;
