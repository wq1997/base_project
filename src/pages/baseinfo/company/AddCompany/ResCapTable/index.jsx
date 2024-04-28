import { Input, InputNumber } from "antd";
import "./index.less";
import { useEffect, useState } from "react";

const ResCapTable = ({ supportAutoExecute, data, onChange }) => {
    const [responsivenessDetail, setResponsivenessDetail] = useState({
        heightPeakCut: { dayBefore: undefined, dayIn: undefined, realTime: undefined },
        lowPeakCut: { dayBefore: undefined, dayIn: undefined, realTime: undefined },
    });

    const change = (value, pKey, sKey) => {
        const _responsivenessDetail = { ...responsivenessDetail };
        _responsivenessDetail[pKey][sKey] = value;
        setResponsivenessDetail(_responsivenessDetail);
        onChange(_responsivenessDetail);
    };

    useEffect(() => {
        if (data) setResponsivenessDetail(data);
    }, [data]);

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
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.heightPeakCut?.dayBefore}
                        onChange={value => change(value, "heightPeakCut", "dayBefore")}
                        style={{width: '100%'}}
                    />
                </div>
                <div>
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.heightPeakCut?.dayIn}
                        onChange={value => change(value, "heightPeakCut", "dayIn")}
                        style={{width: '100%'}}
                    />
                </div>
                <div>
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.heightPeakCut?.realTime}
                        onChange={value => change(value, "heightPeakCut", "realTime")}
                        style={{width: '100%'}}
                        disabled={!supportAutoExecute}
                    />
                </div>
            </div>
            <div className="item">
                <div>填谷</div>
                <div>
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.lowPeakCut?.dayBefore}
                        onChange={value => change(value, "lowPeakCut", "dayBefore")}
                        style={{width: '100%'}}
                    />
                </div>
                <div>
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.lowPeakCut?.dayIn}
                        onChange={value => change(value, "lowPeakCut", "dayIn")}
                        style={{width: '100%'}}
                    />
                </div>
                <div>
                    <InputNumber
                        min={0}
                        value={responsivenessDetail?.lowPeakCut?.realTime}
                        onChange={value => change(value, "lowPeakCut", "realTime")}
                        style={{width: '100%'}}
                        disabled={!supportAutoExecute}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResCapTable;
