import "./index.less";

const Confirm = () => {
    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">待处理任务</div>
                <div className="content"></div>
                <div className="btns">
                    <Button type="primary">邀约确认</Button>
                </div>
            </div>
            <div className="response-suggest"></div>
            <div className="curve"></div>
        </div>
    );
};

export default Confirm;
