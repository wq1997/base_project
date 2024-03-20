import { Input } from "antd";
import "./index.less";
import { useState } from "react";

const ResCapTable = ({ onChange }) => {
    const [responsivenessDetail, setResponsivenessDetail] = useState({
        heightPeakCut: { dayBefore: undefined, dayIn: undefined, realTime: undefined },
        lowPeakCut: { dayBefore: undefined, dayIn: undefined, realTime: undefined },
    });

    const change = (value, pKey, sKey) => {
        const _responsivenessDetail = { ...responsivenessDetail }
        _responsivenessDetail[pKey][sKey] = value
        setResponsivenessDetail(_responsivenessDetail)
        console.log('_responsivenessDetail',_responsivenessDetail)
        if(Object({
            _responsivenessDetail.heightPeakCut
        }))
        onChange(_responsivenessDetail)
    }

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
                    <Input onChange={e => change(e.target.value, 'heightPeakCut', 'dayBefore')} />
                </div>
                <div>
                    <Input onChange={e => change(e.target.value, 'heightPeakCut', 'dayIn')} />
                </div>
                <div>
                    <Input onChange={e => change(e.target.value, 'heightPeakCut', 'realTime')} />
                </div>
            </div>
            <div className="item">
                <div>填谷</div>
                <div>
                    <Input onChange={e => change(e.target.value, 'lowPeakCut', 'dayBefore')} />
                </div>
                <div>
                    <Input onChange={e => change(e.target.value, 'lowPeakCut', 'dayIn')} />
                </div>
                <div>
                    <Input onChange={e => change(e.target.value, 'lowPeakCut', 'realTime')} />
                </div>
            </div>
        </div>
    );
};

export default ResCapTable;
