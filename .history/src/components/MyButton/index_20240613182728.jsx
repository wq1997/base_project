import { Button } from "antd";
import { useState } from "react";

const Index = ({ active, color, text }) => {
    return <div className={active ? "active" : ""}>{text}</div>;
};

export default Index;
