import { Helmet } from 'react-helmet';
import { theme } from 'antd';
import { PageTitle } from "@/components";
import { useSearchParams } from 'umi';
import styles from "./index.less";
import { useEffect, useState } from 'react';
import { postInvestmentCalculation } from "@/services/serve"

const InvestmentResult = () => {
    const { token } = theme.useToken();
    const [result, setResult] = useState({});
    const [searchParams] = useSearchParams();
    const firstArea = searchParams.get('firstArea')
    const secondArea = searchParams.get('secondArea')
    const billingSystem = searchParams.get('billingSystem')
    const electricType = searchParams.get('electricType')
    const voltageLevel = searchParams.get('voltageLevel')
    const installedCapacity = searchParams.get('installedCapacity')

    const getResult = async () => {
        const res = await postInvestmentCalculation({
            districtOneId: Number(firstArea),
            districtTwoId: Number(secondArea)||'',
            electricityTypeId: Number(electricType)||'',
            costId: Number(billingSystem)||'',
            voltageLevelId: Number(voltageLevel)||'',
            capacity: Number(installedCapacity),
            cycle: 20
        });
        if(res?.data){
            setResult(res?.data)
        }
    }

    useEffect(()=> {
        getResult();
    }, [])
    return (
        <div
            style={{
                width: '100%',
                height: 'calc(100vh)',
            }}
            className={styles.investmentResult}
        >
            <div style={{padding: '24px 16px'}}>
                <Helmet><title>测算结果</title></Helmet>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="测算结果" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <div className={styles.resultList}>
                    <div className={styles.resultListItem}>全生命周期收益</div>
                    <div className={styles.resultListItem}>{result?.totalRevenue||''}</div>
                    <div className={styles.resultListItem}>初始投资回收期</div>
                    <div className={styles.resultListItem}>{result?.recyclingCycle||''}</div>
                    <div className={styles.resultListItem}>收益率（IRR）</div>
                    <div className={styles.resultListItem}>{result?.irr||''}</div>
                    <div className={styles.resultListItem}>动态单位造价</div>
                    <div className={styles.resultListItem}>{result?.unitCost||''}</div>
                    <div className={styles.resultListItem}>动态总造价</div>
                    <div className={styles.resultListItem}>{result?.totalCost||''}</div>
                    <div className={styles.resultListItem}>占地面积</div>
                    <div className={styles.resultListItem}>{result?.floorArea||''}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="收益估算" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <div className={styles.estimateData}>
                    <div className={styles.estimateDataItem} style={{background: token.colorPrimary, color: 'white'}}>测算周期 {result?.cycle}年</div>
                    <div className={styles.estimateDataItem} style={{background: '#fbb03b', color: 'white'}}>年运营天数 {result?.annualOperatingDays||''}天</div>
                </div>
                <div className={styles.estimateResult}>
                    <div className={styles.estimateResultItem}>年数</div>
                    <div className={styles.estimateResultItem}>总收益</div>
                    {
                        result?.annualIncome?.map((item, index) => {
                            return (
                                <>
                                    <div className={styles.estimateResultItem}>{index===0?"初期投资":index}</div>
                                    <div className={styles.estimateResultItem}>{item}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default InvestmentResult;