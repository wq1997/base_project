import React, { useState } from "react";
import { SearchInput } from '@/components'
import './index.less'

const Company = () => {

    const [name, setName] = useState()

    return (
        <div>
            <div className="search">
                <SearchInput label='公司名称' />
            </div>
        </div>
    );
};

export default Company;
