import { Select, Space } from "antd";
import { SearchInput } from "@/components";
import "./index.less";

const Board = () => {
    return (
        <div className="board">
            <div className="title">
                <span>在途项目看板</span>
                <SearchInput
                    label="数据维度"
                    type="select"
                    options={[
                        {
                            namde: "项目阶段图",
                            code: "项目类型图",
                        },
                        {
                            value: "lucy",
                            label: "Lucy",
                        },
                        
                    ]}
                />
            </div>
        </div>
    );
};

export default Board;
