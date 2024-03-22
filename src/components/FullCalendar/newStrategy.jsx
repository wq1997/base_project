import { Iconify } from '@/components';
import { Button, Drawer, Form } from "antd";
import styles from "./newStrategy.less";
import { useState } from 'react';

const NewStrategy = () => {
    const [form1] = Form.useForm(); // 电站类型和并网点
    const [drawerOpen, setDrawerOpen] = useState(false); // 控制新建策略右边抽屉开关

    const onDrawerClose = () => {
        setDrawerOpen(false);
    }

    return (
        <div>
            <Button type="primary" onClick={()=>setDrawerOpen(true)}>
                <div className={styles.btn}>
                    <Iconify icon="material-symbols:add" size={24} />
                    新建策略
                </div>
            </Button>

            <Drawer 
                width="940" 
                title="新建策略"
                open={drawerOpen} 
                onClose={onDrawerClose}
            >
                <Form form={form1}>
                    
                </Form>
            </Drawer>
        </div>
    )
}

export default NewStrategy;