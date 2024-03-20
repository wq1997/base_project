import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

const Company = ({ open, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(open);

    const handleOk = () => {
        onClose(false);
    };
    const handleCancel = () => {
        onClose(false);
    };

    return (
        <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default Company;
