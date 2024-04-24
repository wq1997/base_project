import { Select, Space } from "antd";
import "./index.less";

const Board = () => {
    return (
        <div className="board">
            <div className="title">
                <span>在途项目看板</span>
                <div>
                    数据维度：
                    <Select
                        defaultValue="lucy"
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: "jack",
                                label: "Jack",
                            },
                            {
                                value: "lucy",
                                label: "Lucy",
                            },
                            {
                                value: "Yiminghe",
                                label: "yiminghe",
                            },
                            {
                                value: "disabled",
                                label: "Disabled",
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Board;
