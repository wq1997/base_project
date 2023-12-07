
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
        console.log('plantDetails', plantDetails, realData)
        dealSeletData(plantDetails.info.PCS);
    }, [plantDetails])
    useEffect(() => {
        initData();
    })
    useEffect(() => {
        realData?.map(it => {
            if (it.title === 'PCS') {
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
    const initData = () => {
        clearInterval(time);
        let time = setInterval(() => {
            dispatch({
                type: 'device/getALLContainer', payload: {
                    containerId: option[0]?.value
                }
            });
        }, 24000);
        return () => clearInterval(time)
    }

    const dealSeletData = (data) => {
        let arr = [];
        data.map((it, index) => {
            arr.push({
                value: it.id,
                label: `${index + 1}号PCS舱`
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
                placeholder="请选择PCS"
                defaultValue='1号PCS舱'
                onChange={changeData}
                options={option}
            />
            {
                data.map((it, index) => {
                    return (
                        <CardData data={{ title: `${index + 1}号PCS`, data: it }} />
                    )
                })
            }
        </div>
    )
}

export default RealtimeData