import { Modal, Form, Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useIntl, useDispatch } from "umi";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/services/request";
import { saveSystemInfo as saveSystemInfoServe } from "@/services/user";

const UserModal = ({ open, onClose }) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { user } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                ...user,
            });
            setUserInfo({ ...user });
        }
    }, [open]);

    return (
        <Modal
            title={intl.formatMessage({id: '个人中心'})}
            open={open}
            onOk={async () => {
                const values = await form.validateFields();
                const res = await saveSystemInfoServe({
                    systemLogo: userInfo?.systemLogo,
                    systemName: values?.systemName,
                });
                if (res?.data?.code === "ok") {
                    onClose();
                    form.resetFields();
                    setUserInfo(null);
                    dispatch({ type: "user/getUserInfo" });
                }
            }}
            onCancel={() => {
                onClose();
                form.resetFields();
                setUserInfo(null);
            }}
            width={800}
            centered
        >
            <div style={{ padding: "20px 0 0 0" }}>
                <Form form={form}>
                    <Form.Item label={intl.formatMessage({id: "系统Logo"})} name="systemLogo">
                        <Upload
                            accept=".jpg,.jpeg,.png"
                            action={`${getBaseUrl()}user/standardUser/uploadSystemLogo`}
                            maxCount={1}
                            showUploadList={true}
                            headers={{
                                authorization: "Bearer " + localStorage.getItem("Token"),
                            }}
                            onChange={file => {
                                if (file?.fileList?.length > 0) {
                                    if (file?.file?.response?.code === "ok") {
                                        const data = file?.file?.response?.data;
                                        setUserInfo({
                                            ...userInfo,
                                            systemLogo: data,
                                        });
                                    }
                                } else {
                                    setUserInfo({
                                        ...userInfo,
                                        systemLogo: "",
                                    });
                                }
                            }}
                            defaultFileList={
                                userInfo?.systemLogo
                                    ? [
                                          {
                                              uid: userInfo?.systemLogo,
                                              url: userInfo?.systemLogo,
                                              status: "done",
                                              name: userInfo?.systemLogo,
                                          },
                                      ]
                                    : []
                            }
                        >
                            <Button icon={<UploadOutlined />}>{intl.formatMessage({id: '点击上传'})}</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({id: '系统名称'})} name="systemName">
                        <Input placeholder={intl.formatMessage({id: "请输入系统名称"})} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default UserModal;
