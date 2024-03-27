import { Select, DatePicker, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { IconButton, Iconify } from '@/components';

const COLORS = [
  '#00a76f',
  '#8e33ff',
  '#00b8d9',
  '#003768',
  '#22c55e',
  '#ffab00',
  '#ff5630',
  '#7a0916',
];

export default function CalendarEventForm({
  type,
  open,
  onCancel,
  initValues,
  onEdit,
  onCreate,
  onDelete,
}) {
  const title = type === 'add' ? 'Add Event' : 'Edit Event';
  const [form] = Form.useForm();

  const [strategyDatasource, setStrategyDatasource] = useState([
    {
        id: 1,
        name: '策略1',
        creator: '创建者1',
        createTime: '2024/03/26'
    },
    {
        id: 2,
        name: '策略2',
        creator: '创建者2',
        createTime: '2024/03/27'
    }
]);

  useEffect(() => {
    // 当 initValues 改变时，手动更新表单的值
    const { color = COLORS[0], ...others } = initValues;
    form.setFieldsValue({ ...others, color });
  }, [initValues, form]);

  // eslint-disable-next-line react/function-component-definition, react/no-unstable-nested-components
  const ModalFooter = (_, { OkBtn, CancelBtn }) => {
    return (
      <div>
        {type === 'edit' ? (
          <div className="flex justify-between">
            <IconButton
              onClick={() => {
                onDelete(initValues.id);
                onCancel();
              }}
            >
              <Iconify icon="fluent:delete-16-filled" size={20} />
            </IconButton>
            <div>
              <CancelBtn />
              <OkBtn />
            </div>
          </div>
        ) : (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      title={'创建策略执行日程'}
      centered
      onCancel={onCancel}
      footer={ModalFooter}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            const { id } = initValues;
            const event = { ...values, id };
            if (type === 'add') onCreate(event);
            if (type === 'edit') onEdit(event);
            onCancel();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
            form={form}
            labelCol={{
                span: 3
            }}
        >
            <Form.Item label="策略" name={"name"} rules={[FORM_REQUIRED_RULE]}>
                <Select 
                    options={strategyDatasource.map(item => {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    })}
                    placeholder="请选择策略"
                />
            </Form.Item>
            <Form.Item label="时间" name={"time"} rules={[FORM_REQUIRED_RULE]}>
                    <DatePicker.RangePicker showTime />
            </Form.Item>
            <Form.Item label="备注" name="remark">
                    <Input.TextArea placeholder='描述'/>
            </Form.Item>
        </Form>
    </Modal>
  );
}
