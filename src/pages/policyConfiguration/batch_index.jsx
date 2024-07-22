import { useState } from "react";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import PolicyConfiguration_one from "./batch_policy_1.0";
import PolicyConfiguration_two from "./batch_policy_2.0";
import { Space, theme, Select, Row } from "antd";
import { optionType } from "@/utils/constants";
import { useIntl } from "umi";

const PolicyConfiguration = ({deviceList}) => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [deviceVersion, setDeviceVersion] = useState(7);
    const [selectDeviceList, setSelectDeviceList] = useState([]);
    const areaStyle = useEmotionCss(() => {
        return {
            background: token.bgcColorB_l,
            padding: '30px 30px',
        }
    })

    return (
        <Space style={{ width: '100%', height: 'auto', minHeight: '100%', background: "#0A1328" }} direction="vertical" size={12}>
            <div className={areaStyle}>
                <Row>
                    <div style={{marginRight: 12}}>{intl.formatMessage({id: '设备选择'})}</div>
                    <Space size={12}>
                        <Select 
                            style={{width: 200}} 
                            options={optionType} 
                            value={deviceVersion}
                            onChange={(value)=>{
                                setDeviceVersion(value);
                                setSelectDeviceList([]);
                            }}
                        />
                        <Select 
                            mode="multiple"
                            style={{width: 400}} 
                            options={deviceList?.filter(item => item?.type===deviceVersion)?.map(item => {
                                return {
                                    value: item?.id,
                                    label: item?.name
                                }
                            })||[]}
                            value={selectDeviceList}
                            onChange={(setSelectDeviceList)}
                            placeholder={intl.formatMessage({id: '请选择设备'})}
                        />
                    </Space>
                </Row>
            </div>
            <div>
                {deviceVersion===7&&<PolicyConfiguration_one deviceVersion={deviceVersion} deviceList={selectDeviceList} />}
                {deviceVersion===15&&<PolicyConfiguration_two deviceVersion={deviceVersion} deviceList={selectDeviceList} />}
            </div>
        </Space>
    )
}

export default PolicyConfiguration;