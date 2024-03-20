import './index.less'

const ResCapTable = () => {

    return (
        <div className='resCapTable'>
            <div className='item'>
                <div></div>
                <div>日前响应（KW）</div>
                <div>日中配置（KW）</div>
                <div>实时响应（KW）</div>
            </div>
            <div className='item'>
                <div>削峰</div>
                <div><Input /></div>
                <div>日中配置（KW）</div>
                <div>实时响应（KW）</div>
            </div>
            <div className='item'>
                <div>填谷</div>
                <div>日前响应（KW）</div>
                <div>日中配置（KW）</div>
                <div>实时响应（KW）</div>
            </div>
        </div>
    )
}

export default ResCapTable;