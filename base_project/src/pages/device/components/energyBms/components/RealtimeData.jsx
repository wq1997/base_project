
import { useDispatch, useSelector, history } from "umi";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Select } from 'antd';
import CardData from '../../components/CardData'
function RealtimeData(props) {
    const [option, setOption] = useState([]);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const { plantDetails, realData } = useSelector(function (state) {
        return state.device
    });
    useEffect(() => {
        dealSeletData(plantDetails.info.PCS);
    }, [plantDetails])
    useEffect(() => {
        dispatch({
            type: 'device/getALLContainer', payload: {
                containerId: option[0]?.value
            }
        });
    }, [option[0]?.value])
    useEffect(() => {
        realData?.map(it => {
            if (it.title === 'BMS') {
                setData(it.arr)
            }
        })
    }, [realData])
    const changeData = (value) => {
        dispatch({
            type: 'device/getALLContainer', payload: {
                containerId: value
            }
        });

    }
    const dealSeletData = (data) => {
        let arr = [];
        data.map((it, index) => {
            arr.push({
                value: it.id,
                label: `${index + 1}号BMS舱`
            })
        });
        setOption(arr);

    }
    return (
        <div className='content'>
            <Select
                showSearch
                style={{
                    width: 200,
                }}
                placeholder="请选择BMS"
                defaultValue='1号BMS舱'
                onChange={changeData}
                options={option}
            />
            {
                data.map((it,index)=>{
                    return(
                        <CardData data={{title:`第${index+1}堆`,data:it}} />
                    )
                })
            }
        </div>
    )
}

export default RealtimeData