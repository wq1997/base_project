import React from 'react';
import { render as renderAmis } from 'amis';

const amisJSON = {
    type: 'page',
    title: '表单页面',
    body: {
        type: 'form',
        mode: 'horizontal',
        api: '/saveForm',
        controls: [
            { label: 'Name', type: 'text', name: 'name' },
            { label: 'Email', type: 'email', name: 'email' }
        ]
    }
};

const AmisPage = () => {
    return (
        <div id="root">
            {renderAmis(amisJSON, {}, {})}
        </div>
    );
};

export default AmisPage;
