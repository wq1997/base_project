import { useEffect, useState } from "react";
import classNames from "classnames";
import { Form, Select, Input, Badge } from "antd";
import styles from "./index.less";
import Card from "../Card";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";

const Index = ({ data: { total, totalCapacity, totalPlant } }) => {
    return (
        <Card
                            title="电站统计"
                            content={
                                <>
                                    <PlantOverview
                                        data={{
                                            total: Object.keys(
                                                dataSource?.plantSummery?.province2PlantCount || {}
                                            )?.map(city => {
                                                return {
                                                    name: city,
                                                    value: dataSource?.plantSummery
                                                        ?.province2PlantCount?.[city],
                                                };
                                            }),
                                            totalCapacity: dataSource?.plantSummery?.totalCapacity,
                                            totalPlant: dataSource?.plantSummery?.count,
                                        }}
                                    />
                                </>
                            }
                        />
        
    );
};

export default Index;
