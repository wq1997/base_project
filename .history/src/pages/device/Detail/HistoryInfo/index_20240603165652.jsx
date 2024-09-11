import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
 
import { Select } from 'antd';
 
const { Option } = Select;
 
export default class App extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  };
 
  render() {
    const options = [
      { label: 'Apple', value: { id: 1, name: 'Apple' } },
      { label: 'Pear', value: { id: 2, name: 'Pear' } },
    ];
 
    return (
      <Select
        onChange={this.handleChange}
        placeholder="Select a option and look at the console"
        optionLabelProp="label"
        value={{ id: 1, name: 'Apple' }}
      >
        {options.map(item => (
          <Option key={item.value.id} {...item}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }
}
 
 
 