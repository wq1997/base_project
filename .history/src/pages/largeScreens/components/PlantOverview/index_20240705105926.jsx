import { useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import styles from "./index.less";
import Card from "../Card";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";

const Index = ({ data }) => {
    return (
        <Charts3D
            colorList={["#34FFFD", "#FFF073", "#76B3FF", "#E8A7FF", "#01F29B", "#FF9960"]}
            data={data}
        />
    );
};

export default Index;
