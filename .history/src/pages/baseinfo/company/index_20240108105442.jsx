import React from "react";
import { SearchInput } from '@/components'
import { Button, Checkbox, Form, Input } from "antd";

const Company = () => {
    return (
        <div>
            <div className="search">
                <SearchInput label='平台'/>
            </div>
        </div>
    );
};

export default Company;
