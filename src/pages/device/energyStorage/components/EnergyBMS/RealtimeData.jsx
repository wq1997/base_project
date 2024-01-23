// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
// import { dia, shapes, ui } from '@clientio/rappid';
function Com({ id }) {
    const [data, setData] = useState('');
    const [dataArr, setDataArr] = useState([])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});


    const canvas = useRef(null);

//     useEffect(() => {
//         const graph = new dia.Graph();
//         const paper = new dia.Paper({
//             model: graph,
//             background: {
//                 color: '#F8F9FA',
//             },
//             frozen: true,
//             async: true,
//             sorting: dia.Paper.sorting.APPROX,
//             cellViewNamespace: shapes
//         });

//         const scroller = new ui.PaperScroller({
//             paper,
//             autoResizePaper: true,
//             cursor: 'grab'
//         });

//         canvas.current.appendChild(scroller.el);
//         scroller.render().center();

//         const rect = new shapes.standard.Rectangle({
//             position: { x: 100, y: 100 },
//             size: { width: 100, height: 50 },
//             attrs: {
//                 label: {
//                     text: 'Hello World'
//                 }
//             }
//         });

//         graph.addCell(rect);
//         paper.unfreeze();

//         return () => {
//             scroller.remove();
//             paper.remove();
//         };

//   }, []);

    return (
        <div className={styles.detailsWrap}>
         <div className="canvas" ref={canvas}/>
        </div>
    )
}

export default Com