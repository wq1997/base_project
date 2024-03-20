import React, { useState } from "react";
import { Button, Modal } from "antd";

const Company = ({ open }) => {
    const [isModalOpen, setIsModalOpen] = useState(open);
    console.log('open', open)

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default Company;
