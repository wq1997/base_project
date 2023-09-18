import { theme } from 'antd';
import { Form, Input, Button, Picker } from "antd-mobile";
import { Helmet } from 'react-helmet';
import { getLabel } from "@/utils/utils";
import { PageTitle, MobileSelectInput } from "@/components";
import styles from "./index.less";
import { useState, useEffect } from 'react';
import { history } from "umi";
import {
    getAllOpenFirstLevelDistrictList as getAllOpenFirstLevelDistrictListServe,
    getAllOpenSecondLevelDistrictListByFirstLevel as getAllOpenSecondLevelDistrictListByFirstLevelServe,
    getOpenObtainedElectricTypeList as getOpenObtainedElectricTypeListServe,
    getOpenBillingSystemList as getOpenBillingSystemListServe,
    getOpenVoltageLevelList as getOpenVoltageLevelListServe
} from "@/services/serve"

const InvestmentFill = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [firstAreaColumns, setFirstAreaColumns] = useState([]);
    const [secondAreaColumns, setSecondAreaColumns] = useState([]);
    const [electricTypeColumns, setElectricTypeColumns] = useState([]);
    const [billingSystemColumns, setBillingSystemColumns] = useState([]);
    const [voltageLevelColumns, setVoltageLevelColumns] = useState([]);

    const [type, setType] = useState("firstArea");
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState({
        firstArea: [],
        secondArea: []
    })
    const [label, setLabel] = useState({
        firstArea: '',
        secondArea: ''
    })

    const onSelect = (selectType) => {
        setType(selectType);
        setVisible(true);
    }

    const getColumns = () => {
        const enums = {
            firstArea: firstAreaColumns,
            secondArea: secondAreaColumns,
            electricType: electricTypeColumns,
            billingSystem: billingSystemColumns,
            voltageLevel: voltageLevelColumns
        }
        return enums[type]
    }

    const getAllOpenFirstLevelDistrictList = async () => {
        const res = await getAllOpenFirstLevelDistrictListServe();
        if(res?.data){
            setFirstAreaColumns([
                res?.data?.map(item => {
                    return {
                        value: item?.id,
                        label: item?.name
                    }
                })
            ])
        }else{
            setFirstAreaColumns([])
        }
    }

    const getAllOpenSecondLevelDistrictListByFirstLevel = async (parentId) => {
        const res = await getAllOpenSecondLevelDistrictListByFirstLevelServe({parentId});
        if(res?.data?.length>0){
            setSecondAreaColumns([
                res?.data?.map(item => {
                    return {
                        value: item?.id,
                        label: item?.name
                    }
                })
            ])
        }else{
            setSecondAreaColumns([]);
        }
    }

    const getOpenObtainedElectricTypeList = async (params) => {
        const res = await getOpenObtainedElectricTypeListServe(params);
        if(res?.data?.length>0){
            setElectricTypeColumns([
                res?.data?.map(item => {
                    return {
                        value: item?.id,
                        label: item?.name
                    }
                })
            ])
        }else{
            setElectricTypeColumns([]);
        }
    }

    const getOpenBillingSystemList = async (params) => {
        const res = await getOpenBillingSystemListServe(params);
        if(res?.data?.length){
            setBillingSystemColumns([
                res?.data?.map(item => {
                    return {
                        value: item?.id,
                        label: item?.name
                    }
                })
            ])
        }else{
            setBillingSystemColumns([])
        }
    }

    const getOpenVoltageLevelList = async (params) => {
        const res = await getOpenVoltageLevelListServe(params);
        if(res?.data?.length>0){
            setVoltageLevelColumns([
                res?.data?.map(item => {
                    return {
                        value: item?.id,
                        label: item?.name
                    }
                })
            ])
        }else{
            setVoltageLevelColumns([])
        }
    }

    const initData = () => {
        getAllOpenFirstLevelDistrictList();
    }

    useEffect(()=>{
        initData()
    }, [])

    useEffect(()=>{
        if(!value.firstArea?.[0]){
            return;
        }
        getAllOpenSecondLevelDistrictListByFirstLevel(value.firstArea?.[0]);
        setValue({
            ...value,
            secondArea: [],
            electricType: [],
            billingSystem: [],
            voltageLevel: []
        })
        setLabel({
            ...label,
            secondArea: '',
            electricType: '',
            billingSystem: '',
            voltageLevel: ''
        })
        form.setFieldsValue({
            secondArea: undefined,
            electricType: undefined,
            billingSystem: undefined,
            voltageLevel: undefined
        })
        setSecondAreaColumns([]);
        setElectricTypeColumns([]);
        setBillingSystemColumns([]);
        setVoltageLevelColumns([]);
    }, [value.firstArea]);

    useEffect(()=>{
        if(!value.firstArea?.[0] || !value.secondArea?.[0]){
            return;
        }
        getOpenObtainedElectricTypeList({
            districtOneId: value.firstArea?.[0],
            districtTwoId: value.secondArea?.[0]
        });
        setValue({
            ...value,
            electricType: [],
            billingSystem: [],
            voltageLevel: []
        })
        setLabel({
            ...label,
            electricType: '',
            billingSystem: '',
            voltageLevel: ''
        })
        form.setFieldsValue({
            electricType: undefined,
            billingSystem: undefined,
            voltageLevel: undefined
        })
        setElectricTypeColumns([]);
        setBillingSystemColumns([]);
        setVoltageLevelColumns([]);
    }, [value.secondArea])

    useEffect(()=>{
        if(!value.firstArea?.[0] || !value.secondArea?.[0] || !value.electricType?.[0]){
            return;
        }
        getOpenBillingSystemList({
            districtOneId: value.firstArea?.[0],
            districtTwoId: value.secondArea?.[0],
            electricityTypeId: value.electricType?.[0]
        });
        setValue({
            ...value,
            billingSystem: [],
            voltageLevel: []
        })
        setLabel({
            ...label,
            billingSystem: '',
            voltageLevel: ''
        })
        form.setFieldsValue({
            billingSystem: undefined,
            voltageLevel: undefined
        })
        setBillingSystemColumns([]);
        setVoltageLevelColumns([]);
    }, [value.electricType])

    useEffect(()=>{
        if(!value.firstArea?.[0] || !value.secondArea?.[0] || !value.electricType?.[0] ||!value.billingSystem?.[0]){
            return;
        }
        getOpenVoltageLevelList({
            districtOneId: value.firstArea?.[0],
            districtTwoId: value.secondArea?.[0],
            electricityTypeId: value.electricType?.[0],
            costId: value.billingSystem?.[0]
        });
        setValue({
            ...value,
            voltageLevel: []
        })
        setLabel({
            ...label,
            voltageLevel: ''
        })
        form.setFieldsValue({
            voltageLevel: undefined
        })
        setVoltageLevelColumns([]);
    }, [value.billingSystem])

    const showSecondArea = (value.firstArea?.[0]&&secondAreaColumns[0]?.length>0 || !value.firstArea?.[0]);

    return (
        <div
            style={{
                width: '100%',
                height: 'calc(100vh)'
            }}
            className={styles.investmentFill}
        >
            <div style={{padding: '24px 16px'}}>
                <Helmet><title>投资测算</title></Helmet>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="投资测算" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <Form
                    layout='horizontal'
                    autoComplete="off"
                    form={form}
                    initialValues={{
                        zq: '20年',
                        fcbl: '0%（自营）',
                        sfbl: '100%'
                    }}
                >
                    <Form.Item name="firstArea" label="一级区域"  rules={[{required: true, message: '请选择一级区域'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择一级区域" 
                            onClick={()=>{
                                onSelect("firstArea");
                            }}
                            label={label["firstArea"]}
                        />
                    </Form.Item>
                    {
                        showSecondArea &&
                        <Form.Item name="secondArea" label="二级区域" rules={showSecondArea&&[{required: true, message: '请选择二级区域'}]}> 
                            <MobileSelectInput 
                                placeholder="请选择二级区域"
                                onClick={()=>onSelect("secondArea")} 
                                label={label["secondArea"]}
                            />
                        </Form.Item>
                    }
                    <Form.Item name="electricType" label="用电类型" rules={[{required: true, message: '请选择用电类型'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择用电类型"
                            onClick={()=>onSelect("electricType")} 
                            label={label["electricType"]} 
                        />
                    </Form.Item>
                    <Form.Item name="billingSystem" label="计费制度" rules={[{required: true, message: '请选择计费制度'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择计费制度"
                            onClick={()=>onSelect("billingSystem")} 
                            label={label["billingSystem"]}  
                        />
                    </Form.Item>
                    <Form.Item name="voltageLevel" label="电压等级" rules={[{required: true, message: '请选择电压等级'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择电压等级" 
                            onClick={()=>onSelect("voltageLevel")} 
                            label={label["voltageLevel"]}  
                        />
                    </Form.Item>
                    <Form.Item name="installedCapacity" label="装机容量" rules={[{required: true}]}> 
                        <Input placeholder="请输入装机容量 kWh" />
                    </Form.Item>
                    <Form.Item name="projectCycle" label="项目周期" rules={[{required: true}]} initialValue="20年"> 
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="shareRatio" label="业主分成比例" rules={[{required: true}]} initialValue="0%（自营）"> 
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="paymentRatio" label="首付比例" rules={[{required: true}]} initialValue={'100%'}> 
                        <Input disabled />
                    </Form.Item>
                </Form>
                <Button 
                    style={{
                        background: 'linear-gradient(to bottom, #27E0CE 20%, #32B9CD 80%)',
                        color: 'white', 
                        width: '100%',
                        borderRadius: 8,
                        height: 50,
                        marginTop: 20
                    }}
                    onClick={async () => {
                        form.validateFields().then(values => {
                            history.push({
                                pathname: "/mobile/investment/result",
                                search: `?firstArea=${values?.firstArea?.[0]}&secondArea=${values?.secondArea?.[0]}&billingSystem=${values?.billingSystem?.[0]}&electricType=${values?.electricType?.[0]}&voltageLevel=${values?.voltageLevel?.[0]}&installedCapacity=${values?.installedCapacity}`
                            })
                        });
                    }}
                >
                    开始测算
                </Button>
            </div>
            <Picker
                columns={getColumns()}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                value={value[type]}
                onConfirm={v => {
                    form.setFieldsValue({
                        [type]: v
                    })
                    setValue({
                        ...value,
                        [type]: v
                    });
                    setLabel({
                        ...label,
                        [type]: getLabel(getColumns(), v)
                    })
                }}
            />
        </div>
    )
}

export default InvestmentFill;