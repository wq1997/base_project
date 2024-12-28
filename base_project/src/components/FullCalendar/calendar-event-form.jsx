import { Select, DatePicker, Form, Input, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import {
  DeleteOutlined
} from '@ant-design/icons';
import { useIntl } from "umi";

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
  strategy
}) {
  const title = type === 'add' ? '新建策略执行日程' : '编辑策略执行日程';
  const [form] = Form.useForm();
  const [strategyDatasource, setStrategyDatasource] = useState([...strategy[0].children]);
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 当 initValues 改变时，手动更新表单的值
    const { color = COLORS[0], ...others } = initValues;
    form.setFieldsValue({ ...others, color });
  }, [initValues, form]);

  useEffect(() => {
    setStrategyDatasource([...strategy[0].children])
  }, [strategy])
  // eslint-disable-next-line react/function-component-definition, react/no-unstable-nested-components
  const ModalFooter = (_, { OkBtn, CancelBtn }) => {
    return (
      <div>
        {type === 'edit' ? (
          <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between', }}>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                // onCancel();
                setIsOpen(true)
              }}
            >
            </Button>
            <div style={{ width: "130px", display: 'flex', justifyContent: 'space-between', }}>
              <CancelBtn />
              <OkBtn />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', }}>
            <div style={{ width: '10px' }}></div>
            <div style={{ width: "130px", display: 'flex', justifyContent: 'space-between', }}>
              <CancelBtn />
              <OkBtn />
            </div>
          </div>
        )}
      </div>
    );
  };


  return (
    <>
      <Modal
        open={open}
        title={t(title)}
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label={t("策略")} name={"strategyId"} rules={[FORM_REQUIRED_RULE]}>
            <Select
              disabled={type === 'add' ? false : true}
              options={strategyDatasource?.map(item => {
                return {
                  label: item.title,
                  value: item.strategyId
                }
              })}
              placeholder={t("请选择策略")}
            />
          </Form.Item>
          <Form.Item label={t("开始时间")} name={"start"} rules={[FORM_REQUIRED_RULE]}>
            <DatePicker disabled={type === 'add' ? false : true} format={'YYYY-MM-DD'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label={t("结束时间")}  name={"end"} rules={[FORM_REQUIRED_RULE]}>
            <DatePicker disabled={type === 'add' ? false : true} format={'YYYY-MM-DD'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label={t("备注")} name="remarks">
            <Input.TextArea disabled={type === 'add' ? false : true} placeholder={t('描述')} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t('系统提示')}
        open={isOpen}
        onCancel={()=>setIsOpen(false)}
        onOk={
          () => {
            onDelete(initValues?.id)
            onCancel();
            setIsOpen(false)
          }
        }
      >
        <span>
          {t('策略执行日程删除后将无法恢复，是否确认删除该日程？')}
        </span>
      </Modal>
    </>

  );
}
