import React, { useState } from "react";
import { SearchInput } from '@/components'
import './index.less'

const Company = () => {

    const [name, setName] = useState(1)

    return (
        <div>
            <div className="search">
                <SearchInput label='公司名称' value={name} onChange={value => setName(value)} />
                <Space  >
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="link">Link</Button>
                </Space>
            </div>
        </div>
    );
};

export default Company;
