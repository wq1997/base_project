
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { theme } from "antd";
import dayjs from 'dayjs';
import {  useIntl } from "umi";

const mock1=[
    {
        "time": 1712073600000,
        "value": "0.00"
    },
    {
        "time": 1712073900000,
        "value": "-200.00"
    },
    {
        "time": 1712074200000,
        "value": "-200.00"
    },
    {
        "time": 1712074500000,
        "value": "-200.00"
    },
    {
        "time": 1712074800000,
        "value": "-200.00"
    },
    {
        "time": 1712075100000,
        "value": "-200.00"
    },
    {
        "time": 1712075400000,
        "value": "-200.00"
    },
    {
        "time": 1712075700000,
        "value": "-199.90"
    },
    {
        "time": 1712076000000,
        "value": "-200.00"
    },
    {
        "time": 1712076300000,
        "value": "-200.00"
    },
    {
        "time": 1712076600000,
        "value": "-200.00"
    },
    {
        "time": 1712076900000,
        "value": "-200.00"
    },
    {
        "time": 1712077200000,
        "value": "-200.00"
    },
    {
        "time": 1712077500000,
        "value": "-200.00"
    },
    {
        "time": 1712077800000,
        "value": "-200.00"
    },
    {
        "time": 1712078100000,
        "value": "-200.00"
    },
    {
        "time": 1712078400000,
        "value": "-200.00"
    },
    {
        "time": 1712078700000,
        "value": "-199.90"
    },
    {
        "time": 1712079000000,
        "value": "-200.00"
    },
    {
        "time": 1712079300000,
        "value": "-200.00"
    },
    {
        "time": 1712079600000,
        "value": "-200.00"
    },
    {
        "time": 1712079900000,
        "value": "-200.00"
    },
    {
        "time": 1712080200000,
        "value": "-200.00"
    },
    {
        "time": 1712080500000,
        "value": "-200.00"
    },
    {
        "time": 1712080800000,
        "value": "-200.00"
    },
    {
        "time": 1712081100000,
        "value": "-199.90"
    },
    {
        "time": 1712081400000,
        "value": "-199.90"
    },
    {
        "time": 1712081700000,
        "value": "-200.00"
    },
    {
        "time": 1712082000000,
        "value": "-200.00"
    },
    {
        "time": 1712082300000,
        "value": "-200.00"
    },
    {
        "time": 1712082600000,
        "value": "-200.00"
    },
    {
        "time": 1712082900000,
        "value": "-200.00"
    },
    {
        "time": 1712083200000,
        "value": "-200.00"
    },
    {
        "time": 1712083500000,
        "value": "-200.00"
    },
    {
        "time": 1712083800000,
        "value": "-200.00"
    },
    {
        "time": 1712084100000,
        "value": "-200.00"
    },
    {
        "time": 1712084400000,
        "value": "-200.00"
    },
    {
        "time": 1712084700000,
        "value": "-200.00"
    },
    {
        "time": 1712085000000,
        "value": "-200.00"
    },
    {
        "time": 1712085300000,
        "value": "-200.00"
    },
    {
        "time": 1712085600000,
        "value": "-199.90"
    },
    {
        "time": 1712085900000,
        "value": "-200.00"
    },
    {
        "time": 1712086200000,
        "value": "-200.00"
    },
    {
        "time": 1712086500000,
        "value": "-200.00"
    },
    {
        "time": 1712086800000,
        "value": "-200.00"
    },
    {
        "time": 1712087100000,
        "value": "-200.00"
    },
    {
        "time": 1712087400000,
        "value": "-200.00"
    },
    {
        "time": 1712087700000,
        "value": "-200.00"
    },
    {
        "time": 1712088000000,
        "value": "-200.00"
    },
    {
        "time": 1712088300000,
        "value": "-200.00"
    },
    {
        "time": 1712088600000,
        "value": "-200.00"
    },
    {
        "time": 1712088900000,
        "value": "-200.00"
    },
    {
        "time": 1712089200000,
        "value": "-200.00"
    },
    {
        "time": 1712089500000,
        "value": "-200.00"
    },
    {
        "time": 1712089800000,
        "value": "-199.90"
    },
    {
        "time": 1712090100000,
        "value": "-200.00"
    },
    {
        "time": 1712090400000,
        "value": "-200.00"
    },
    {
        "time": 1712090700000,
        "value": "-200.00"
    },
    {
        "time": 1712091000000,
        "value": "-200.00"
    },
    {
        "time": 1712091300000,
        "value": "-200.00"
    },
    {
        "time": 1712091600000,
        "value": "-200.00"
    },
    {
        "time": 1712091900000,
        "value": "-200.00"
    },
    {
        "time": 1712092200000,
        "value": "-200.00"
    },
    {
        "time": 1712092500000,
        "value": "-200.00"
    },
    {
        "time": 1712092800000,
        "value": "-200.00"
    },
    {
        "time": 1712093100000,
        "value": "-200.00"
    },
    {
        "time": 1712093400000,
        "value": "-200.00"
    },
    {
        "time": 1712093700000,
        "value": "0.00"
    },
    {
        "time": 1712094000000,
        "value": "0.00"
    },
    {
        "time": 1712094300000,
        "value": "0.00"
    },
    {
        "time": 1712094600000,
        "value": "0.00"
    },
    {
        "time": 1712094900000,
        "value": "0.00"
    },
    {
        "time": 1712095200000,
        "value": "0.00"
    },
    {
        "time": 1712095500000,
        "value": "0.00"
    },
    {
        "time": 1712095800000,
        "value": "0.00"
    },
    {
        "time": 1712096100000,
        "value": "0.00"
    },
    {
        "time": 1712096400000,
        "value": "0.00"
    },
    {
        "time": 1712096700000,
        "value": "0.00"
    },
    {
        "time": 1712097000000,
        "value": "0.00"
    },
    {
        "time": 1712097300000,
        "value": "0.00"
    },
    {
        "time": 1712097600000,
        "value": "0.00"
    },
    {
        "time": 1712097900000,
        "value": "0.00"
    },
    {
        "time": 1712098200000,
        "value": "0.00"
    },
    {
        "time": 1712098500000,
        "value": "0.00"
    },
    {
        "time": 1712098800000,
        "value": "0.00"
    },
    {
        "time": 1712099100000,
        "value": "0.00"
    },
    {
        "time": 1712099400000,
        "value": "0.00"
    },
    {
        "time": 1712099700000,
        "value": "0.00"
    },
    {
        "time": 1712100000000,
        "value": "0.00"
    },
    {
        "time": 1712100300000,
        "value": "0.00"
    },
    {
        "time": 1712100600000,
        "value": "0.00"
    },
    {
        "time": 1712100900000,
        "value": "0.00"
    },
    {
        "time": 1712101200000,
        "value": "0.00"
    },
    {
        "time": 1712101500000,
        "value": "0.00"
    },
    {
        "time": 1712101800000,
        "value": "0.00"
    },
    {
        "time": 1712102100000,
        "value": "0.00"
    },
    {
        "time": 1712102400000,
        "value": "0.00"
    },
    {
        "time": 1712102700000,
        "value": "0.00"
    },
    {
        "time": 1712103000000,
        "value": "499.90"
    },
    {
        "time": 1712103300000,
        "value": "499.90"
    },
    {
        "time": 1712103600000,
        "value": "499.90"
    },
    {
        "time": 1712103900000,
        "value": "500.00"
    },
    {
        "time": 1712104200000,
        "value": "499.90"
    },
    {
        "time": 1712104500000,
        "value": "500.00"
    },
    {
        "time": 1712104800000,
        "value": "499.90"
    },
    {
        "time": 1712105100000,
        "value": "499.90"
    },
    {
        "time": 1712105400000,
        "value": "499.90"
    },
    {
        "time": 1712105700000,
        "value": "499.90"
    },
    {
        "time": 1712106000000,
        "value": "499.00"
    },
    {
        "time": 1712106300000,
        "value": "497.70"
    },
    {
        "time": 1712106600000,
        "value": "496.70"
    },
    {
        "time": 1712106900000,
        "value": "496.20"
    },
    {
        "time": 1712107200000,
        "value": "495.80"
    },
    {
        "time": 1712107500000,
        "value": "495.50"
    },
    {
        "time": 1712107800000,
        "value": "495.30"
    },
    {
        "time": 1712108100000,
        "value": "495.10"
    },
    {
        "time": 1712108400000,
        "value": "495.00"
    },
    {
        "time": 1712108700000,
        "value": "494.50"
    },
    {
        "time": 1712109000000,
        "value": "494.10"
    },
    {
        "time": 1712109300000,
        "value": "493.80"
    },
    {
        "time": 1712109600000,
        "value": "493.30"
    },
    {
        "time": 1712109900000,
        "value": "492.50"
    },
    {
        "time": 1712110200000,
        "value": "491.60"
    },
    {
        "time": 1712110500000,
        "value": "490.40"
    },
    {
        "time": 1712110800000,
        "value": "489.20"
    },
    {
        "time": 1712111100000,
        "value": "488.10"
    },
    {
        "time": 1712111400000,
        "value": "486.70"
    },
    {
        "time": 1712111700000,
        "value": "484.90"
    },
    {
        "time": 1712112000000,
        "value": "482.80"
    },
    {
        "time": 1712112300000,
        "value": "480.60"
    },
    {
        "time": 1712112600000,
        "value": "478.90"
    },
    {
        "time": 1712112900000,
        "value": "476.80"
    },
    {
        "time": 1712113200000,
        "value": "0.00"
    },
    {
        "time": 1712113500000,
        "value": "0.00"
    },
    {
        "time": 1712113800000,
        "value": "-230.00"
    },
    {
        "time": 1712114100000,
        "value": "-230.00"
    },
    {
        "time": 1712114400000,
        "value": "-230.00"
    },
    {
        "time": 1712114700000,
        "value": "-230.00"
    },
    {
        "time": 1712115000000,
        "value": "-230.00"
    },
    {
        "time": 1712115300000,
        "value": "-230.00"
    },
    {
        "time": 1712115600000,
        "value": "-230.00"
    },
    {
        "time": 1712115900000,
        "value": "-230.00"
    },
    {
        "time": 1712116200000,
        "value": "-230.00"
    },
    {
        "time": 1712116500000,
        "value": "-230.00"
    },
    {
        "time": 1712116800000,
        "value": "-230.00"
    },
    {
        "time": 1712117100000,
        "value": "-230.00"
    },
    {
        "time": 1712117400000,
        "value": "-230.00"
    },
    {
        "time": 1712117700000,
        "value": "-230.00"
    },
    {
        "time": 1712118000000,
        "value": "-230.00"
    },
    {
        "time": 1712118300000,
        "value": "-230.00"
    },
    {
        "time": 1712118600000,
        "value": "-230.00"
    },
    {
        "time": 1712118900000,
        "value": "-230.00"
    },
    {
        "time": 1712119200000,
        "value": "-230.00"
    },
    {
        "time": 1712119500000,
        "value": "-230.00"
    },
    {
        "time": 1712119800000,
        "value": "-230.00"
    },
    {
        "time": 1712120100000,
        "value": "-230.00"
    },
    {
        "time": 1712120400000,
        "value": "-230.00"
    },
    {
        "time": 1712120700000,
        "value": "-230.00"
    },
    {
        "time": 1712121000000,
        "value": "-230.00"
    },
    {
        "time": 1712121300000,
        "value": "-230.00"
    },
    {
        "time": 1712121600000,
        "value": "-230.00"
    },
    {
        "time": 1712121900000,
        "value": "-230.00"
    },
    {
        "time": 1712122200000,
        "value": "-230.00"
    },
    {
        "time": 1712122500000,
        "value": "-230.00"
    },
    {
        "time": 1712122800000,
        "value": "-230.00"
    },
    {
        "time": 1712123100000,
        "value": "-230.00"
    },
    {
        "time": 1712123400000,
        "value": "-230.00"
    },
    {
        "time": 1712123700000,
        "value": "-230.00"
    },
    {
        "time": 1712124000000,
        "value": "-230.00"
    },
    {
        "time": 1712124300000,
        "value": "-229.90"
    },
    {
        "time": 1712124600000,
        "value": "-229.90"
    },
    {
        "time": 1712124900000,
        "value": "-230.00"
    },
    {
        "time": 1712125200000,
        "value": "-230.00"
    },
    {
        "time": 1712125500000,
        "value": "-230.00"
    },
    {
        "time": 1712125800000,
        "value": "-230.00"
    },
    {
        "time": 1712126100000,
        "value": "-230.00"
    },
    {
        "time": 1712126400000,
        "value": "-229.90"
    },
    {
        "time": 1712126700000,
        "value": "-230.00"
    },
    {
        "time": 1712127000000,
        "value": "-230.00"
    },
    {
        "time": 1712127300000,
        "value": "-230.00"
    },
    {
        "time": 1712127600000,
        "value": "-230.00"
    },
    {
        "time": 1712127900000,
        "value": "-230.00"
    },
    {
        "time": 1712128200000,
        "value": "-230.00"
    },
    {
        "time": 1712128500000,
        "value": "-230.00"
    },
    {
        "time": 1712128800000,
        "value": "-229.90"
    },
    {
        "time": 1712129100000,
        "value": "-229.90"
    },
    {
        "time": 1712129400000,
        "value": "-230.00"
    },
    {
        "time": 1712129700000,
        "value": "-230.00"
    },
    {
        "time": 1712130000000,
        "value": "-230.00"
    },
    {
        "time": 1712130300000,
        "value": "-230.00"
    },
    {
        "time": 1712130600000,
        "value": "-230.00"
    },
    {
        "time": 1712130900000,
        "value": "-230.00"
    },
    {
        "time": 1712131200000,
        "value": "-230.00"
    },
    {
        "time": 1712131500000,
        "value": "-230.00"
    },
    {
        "time": 1712131800000,
        "value": "-230.00"
    },
    {
        "time": 1712132100000,
        "value": "-230.00"
    },
    {
        "time": 1712132400000,
        "value": "-230.00"
    },
    {
        "time": 1712132700000,
        "value": "-230.00"
    },
    {
        "time": 1712133000000,
        "value": "-230.00"
    },
    {
        "time": 1712133300000,
        "value": "-230.00"
    },
    {
        "time": 1712133600000,
        "value": "-230.00"
    },
    {
        "time": 1712133900000,
        "value": "-230.00"
    },
    {
        "time": 1712134200000,
        "value": "-230.00"
    },
    {
        "time": 1712134500000,
        "value": "-230.00"
    },
    {
        "time": 1712134800000,
        "value": "-230.00"
    },
    {
        "time": 1712135100000,
        "value": "-230.00"
    },
    {
        "time": 1712135400000,
        "value": "-230.00"
    },
    {
        "time": 1712135700000,
        "value": "-230.00"
    },
    {
        "time": 1712136000000,
        "value": "-230.00"
    },
    {
        "time": 1712136300000,
        "value": "-229.90"
    },
    {
        "time": 1712136600000,
        "value": "-229.90"
    },
    {
        "time": 1712136900000,
        "value": "0.00"
    },
    {
        "time": 1712137200000,
        "value": "0.00"
    },
    {
        "time": 1712137500000,
        "value": "0.00"
    },
    {
        "time": 1712137800000,
        "value": "0.00"
    },
    {
        "time": 1712138100000,
        "value": "0.00"
    },
    {
        "time": 1712138400000,
        "value": "0.00"
    },
    {
        "time": 1712138700000,
        "value": "0.00"
    },
    {
        "time": 1712139000000,
        "value": "499.90"
    },
    {
        "time": 1712139300000,
        "value": "499.90"
    },
    {
        "time": 1712139600000,
        "value": "499.90"
    },
    {
        "time": 1712139900000,
        "value": "499.90"
    },
    {
        "time": 1712140200000,
        "value": "500.00"
    },
    {
        "time": 1712140500000,
        "value": "500.00"
    },
    {
        "time": 1712140800000,
        "value": "500.00"
    },
    {
        "time": 1712141100000,
        "value": "499.90"
    },
    {
        "time": 1712141400000,
        "value": "499.90"
    },
    {
        "time": 1712141700000,
        "value": "499.90"
    },
    {
        "time": 1712142000000,
        "value": "499.10"
    },
    {
        "time": 1712142300000,
        "value": "497.80"
    },
    {
        "time": 1712142600000,
        "value": "496.80"
    },
    {
        "time": 1712142900000,
        "value": "496.30"
    },
    {
        "time": 1712143200000,
        "value": "496.00"
    },
    {
        "time": 1712143500000,
        "value": "495.80"
    },
    {
        "time": 1712143800000,
        "value": "495.40"
    },
    {
        "time": 1712144100000,
        "value": "495.20"
    },
    {
        "time": 1712144400000,
        "value": "494.90"
    },
    {
        "time": 1712144700000,
        "value": "494.70"
    },
    {
        "time": 1712145000000,
        "value": "494.30"
    },
    {
        "time": 1712145300000,
        "value": "493.70"
    },
    {
        "time": 1712145600000,
        "value": "493.30"
    },
    {
        "time": 1712145900000,
        "value": "492.50"
    },
    {
        "time": 1712146200000,
        "value": "491.80"
    },
    {
        "time": 1712146500000,
        "value": "490.50"
    },
    {
        "time": 1712146800000,
        "value": "489.10"
    },
    {
        "time": 1712147100000,
        "value": "487.90"
    },
    {
        "time": 1712147400000,
        "value": "486.50"
    },
    {
        "time": 1712147700000,
        "value": "485.10"
    },
    {
        "time": 1712148000000,
        "value": "483.10"
    },
    {
        "time": 1712148300000,
        "value": "480.80"
    },
    {
        "time": 1712148600000,
        "value": "478.90"
    },
    {
        "time": 1712148900000,
        "value": "0.00"
    },
    {
        "time": 1712149200000,
        "value": "0.00"
    },
    {
        "time": 1712149500000,
        "value": "0.00"
    },
    {
        "time": 1712149800000,
        "value": "0.00"
    },
    {
        "time": 1712150100000,
        "value": "0.00"
    },
    {
        "time": 1712150400000,
        "value": "0.00"
    },
    {
        "time": 1712150700000,
        "value": "0.00"
    },
    {
        "time": 1712151000000,
        "value": "0.00"
    },
    {
        "time": 1712151300000,
        "value": "0.00"
    },
    {
        "time": 1712151600000,
        "value": "0.00"
    },
    {
        "time": 1712151900000,
        "value": "0.00"
    },
    {
        "time": 1712152200000,
        "value": "0.00"
    },
    {
        "time": 1712152500000,
        "value": "0.00"
    },
    {
        "time": 1712152800000,
        "value": "0.00"
    },
    {
        "time": 1712153100000,
        "value": "0.00"
    },
    {
        "time": 1712153400000,
        "value": "-200.00"
    },
    {
        "time": 1712153700000,
        "value": "-200.00"
    },
    {
        "time": 1712154000000,
        "value": "-200.00"
    },
    {
        "time": 1712154300000,
        "value": "-200.00"
    },
    {
        "time": 1712154600000,
        "value": "-199.90"
    },
    {
        "time": 1712154900000,
        "value": "-199.90"
    },
    {
        "time": 1712155200000,
        "value": "-199.90"
    },
    {
        "time": 1712155500000,
        "value": "-200.00"
    },
    {
        "time": 1712155800000,
        "value": "-200.00"
    },
    {
        "time": 1712156100000,
        "value": "-200.00"
    },
    {
        "time": 1712156400000,
        "value": "-200.00"
    },
    {
        "time": 1712156700000,
        "value": "-199.90"
    },
    {
        "time": 1712157000000,
        "value": "-200.00"
    },
    {
        "time": 1712157300000,
        "value": "-200.00"
    },
    {
        "time": 1712157600000,
        "value": "-200.00"
    },
    {
        "time": 1712157900000,
        "value": "-199.90"
    },
    {
        "time": 1712158200000,
        "value": "-200.00"
    },
    {
        "time": 1712158500000,
        "value": "-200.00"
    },
    {
        "time": 1712158800000,
        "value": "-200.00"
    },
    {
        "time": 1712159100000,
        "value": "-199.90"
    },
    {
        "time": 1712159400000,
        "value": "-200.00"
    },
    {
        "time": 1712159700000,
        "value": "-200.00"
    }
]
function Com(props) {
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                  },
                  
              }
            ],
            series: [
                {
                    name:'实时功率',
                    type:'line',
                    stack: '总量',
                    symbol:'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color:token.colorPrimary,
                            lineStyle: {
                                color: token.colorPrimary,
                                width:1
                            },
                            areaStyle: { 
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 1,
                                    color: token.colorPrimaryR
                                }]),
                            }
                        }
                    },
                    markPoint:{
                        itemStyle:{
                            normal:{
                                color:'red'
                            }
                        }
                    },
                    data:[12, 32, 11, 14, 90, 30, 10, 82, 91, 34, 90, 33]
                },
            ]
          });
    };

    useEffect(() => {
        // getOptions();
        getMock();

    }, [token]);
    const getMock=()=>{
        let arrX=[];
        let arrY=[]
        mock1.map(it=>{
            arrX.push(dayjs(it.time).format('HH:mm'));
            arrY.push(it.value)
        });
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                // data: [t('并网点')+1,t('并网点')+2,],
                textStyle:{
                    color: token.titleColor//字体颜色
                    },
            },
            xAxis: [
                {
                    type: 'category',
                    data: [...arrX],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        // formatter: '{value} kWh'
                    },
    
                }
            ],
            dataZoom: [{ type: "inside" }],
            toolbox: {
              show: true,
              right: 25,
              feature: {
                magicType: { type: ["line", "bar"], title: "", default: "line" },
                dataZoom: {
                  yAxisIndex: "none",
                },
                saveAsImage: {},
              },
            },
            series: [
            
                {
                    name:t('实时功率'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color:token.colorPrimary,
                            lineStyle: {
                                color: token.colorPrimary,
                                width:1
                            },
                            areaStyle: { 
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 1,
                                    color: token.colorPrimaryR
                                }]),
                            }
                        }
                    },
                    markPoint:{
                        itemStyle:{
                            normal:{
                                color:'red'
                            }
                        }
                    },
                    data: [...arrY]
                },
            ]
        })
    }
    return (
        <div className={styles.content}>
            <CardModel
             title={
                t("实时功率")+'(kW)'
            }
                content={
                    <ReactECharts option={options} style={{height: '100%'}} />
                }
            />

        </div>
    )
}

export default Com