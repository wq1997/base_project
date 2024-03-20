import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

const Company = ({ open, onClose }) => {

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={() => onClose(false)}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default Company;
