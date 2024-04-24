import { Select, Space } from "antd";
import { SearchInput, CardPage } from "@/components";
import "./index.less";

const Board = () => {
    return (
        <div className="board">
            <div className="title">
                <span>在途项目看板</span>
                <div>
                    数据维度：
                    <SearchInput
                    label="所属公司"
                    type="select"
                    value={companyCode}
                    options={companyList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        companyCodeRef.current = value;
                        setCompanyCode(value);
                    }}
                />
                </div>
            </div>
        </div>
    );
};

export default Board;
