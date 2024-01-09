import { Upload, Button, message, Tooltip } from "antd";

const MyUpload = ({ url, onChange, maxCount = 3, maxSizeMB = 10 }) => {
    return (
        <Upload
            action={url}
            headers={{
                Authorization: localStorage.getItem("Token"),
            }}
            maxCount={3}
            beforeUpload={file => {
                if (file.size / 1024 / 1024 > maxSizeMB) {
                    message.info(`文件大小超出${maxSizeMB}MB限制`);
                    return Upload.LIST_IGNORE;
                }
            }}
            onChange={info => {
                if (info.file.status === "done") {
                    message.success("上传成功");
                    onChange(info.fileList?.map(item => item.response?.data));
                } else if (info.file.status === "error") {
                    message.error("上传失败");
                }
            }}
        >
            <Tooltip title={`最大上传数量为${maxCount}，单个文件大小不超过${maxSizeMB}MB`}>
                <Button>点击上传</Button>
            </Tooltip>
        </Upload>
    );
};

export default MyUpload;
