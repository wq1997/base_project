import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
const App = (props) => {
  useEffect(()=>{
  },[props.isOpen])
  return (
    <>
      <Modal title={props.title} open={props.isOpen} onOk={props.onRef} onCancel={props.onRef}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;