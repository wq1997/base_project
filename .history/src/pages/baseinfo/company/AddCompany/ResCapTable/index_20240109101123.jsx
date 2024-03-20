import { Input } from "antd";
import "./index.less";
import { useState } from "react";

const ResCapTable = () => {

    const [responsivenessDetail, setResponsivenessDetail] = useState({
        heightPeakCut:{}
    })

    return (
        <div className="resCapTable">
            <div className="item">
                <div></div>
                <div>日前响应（KW）</div>
                <div>日中配置（KW）</div>
                <div>实时响应（KW）</div>
            </div>
            <div className="item">
                <div>削峰</div>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
            </div>
            <div className="item">
                <div>填谷</div>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
            </div>
        </div>
    );
};

export default ResCapTable;
