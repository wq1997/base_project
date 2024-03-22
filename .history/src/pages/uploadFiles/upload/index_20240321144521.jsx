import React, { useState } from "react";
import { Button, Modal } from "antd";

const Upload = ({ uploadOpen, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Basic Modal"
            open={uploadOpen}
            onOk={handleOk}
            onCancel={() => onClose(false)}
        >
           
        </Modal>
    );
};
export default Upload;
