import { Upload, Button, message, Tooltip, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const defaultFiles = [];

const MyUpload = ({
    accept,
    url,
    files = defaultFiles,
    onChange,
    maxCount = 3,
    maxSizeMB = 10,
}) => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFileList(files);
    }, [files]);

    return (
        <>
            <Upload
                accept={accept}
                action={url}
                headers={{
                    token: localStorage.getItem("Token"),
                }}
                listType="picture-card"
                fileList={fileList}
                maxCount={maxCount}
                beforeUpload={file => {
                    if (file.size / 1024 / 1024 > maxSizeMB) {
                        message.info(`文件大小超出${maxSizeMB}MB限制`);
                        return Upload.LIST_IGNORE;
                    }
                }}
                onChange={info => {
                    let newFiles = info?.fileList;
                    const isDone = info?.file?.status == "done";
                    const is200 = info?.file?.response?.code == 200;
                    if (isDone && is200) {
                        message.success("上传成功");
                        newFiles = newFiles?.map(item => ({
                            fileName: item?.response?.data,
                            ...item,
                        }));
                    } else if (isDone && !is200) {
                        message.error("上传失败");
                    }
                    onChange(newFiles);
                    setFileList(newFiles); //这里必须要重新set一下解决onChange只执行一次问题 fileList默认值的原因
                    if (isDone && !is200) {
                        // 上传失败后不预览
                        newFiles.pop();
                        setFileList(newFiles);
                    }
                }}
            >
                {fileList?.length >= maxCount ? null : (
                    <Tooltip title={`最多上传${maxCount}个文件，单个文件大小不超过${maxSizeMB}MB`}>
                        +
                    </Tooltip>
                )}
            </Upload>
        </>
    );
};

export default MyUpload;
