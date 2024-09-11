import { Upload, Image, message, Tooltip, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const defaultFiles = [];

const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const MyUpload = ({
    accept,
    url,
    files = defaultFiles,
    onChange,
    maxCount = 3,
    maxSizeMB = 10,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFileList(files);
    }, [files]);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <>
            <Upload
                accept={accept}
                action={url}
                headers={{
                    authorization: "Bearer " + localStorage.getItem("Token"),
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
                onPreview={handlePreview}
                onChange={info => {
                    cons
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
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: "none",
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: visible => setPreviewOpen(visible),
                        afterOpenChange: visible => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default MyUpload;
