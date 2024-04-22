import { theme, Table, DatePicker, Form, Button } from "antd";
import { ThemeBtn, LocaleBtn, EditTable, CustomDatePicker } from "@/components";
import { useIntl } from "umi";

const Test = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  const [form] = Form.useForm();
  return (
    <div 
      // style={{
      //   background: token.colorPrimary,
      //   color: token.colorText
      // }}
    >
      <Button
        onClick={async ()=>{
          const values = await form.validateFields();
          console.log("values", values);
        }}
      >
          保存
      </Button>
      <Form form={form}>
        <Form.Item name="tableDatasource">
          <EditTable.EditRowTable
            showClear
            showEdit
            data={[
              {
                monPowers: 0,
                tuePowers: '00:00~03:00',
                wedPowers: '王清',
                thuPowers: 0,
                friPowers: 0,
                satPowers: 0,
                sunPowers: 0,
              },
              {
                monPowers: 0,
                tuePowers: '03:01~05:00',
                wedPowers: '张宇',
                thuPowers: "2024-01-02",
                friPowers: 0,
                satPowers: 0,
                sunPowers: 0,
              }
            ]}
            columns={[
              {
                title: 'Mon',
                dataIndex: 'monPowers',
                editable: true,
                width: '12%',
                inputType: 'InputNumber'
              },
              {
                title: 'Tue',
                dataIndex: 'tuePowers',
                editable: true,
                inputType: 'CustomDatePicker'
              },
              {
                title: 'Wed',
                dataIndex: 'wedPowers',
                editable: true,
                width: '12%',
                inputType: 'Select',
                options: [
                  {
                    value: '王清',
                    name: '王清'
                  },
                  {
                    value: '张宇',
                    name: '张宇'
                  }
                ]
              },
              {
                title: 'Thu',
                dataIndex: 'thuPowers',
                editable: true,
                width: '12%',
                inputType: 'DatePicker'
              },
              {
                title: 'Fri',
                dataIndex: 'friPowers',
                editable: true,
                width: '12%',
              },
              {
                title: 'Sat',
                dataIndex: 'satPowers',
                editable: true,
                width: '12%'
              },
              {
                title: 'Sun',
                dataIndex: 'sunPowers',
                editable: true,
                width: '12%'
              },
            ]}
          />
        </Form.Item>
      </Form>
      <ThemeBtn />
      <LocaleBtn />
      <p>{intl.formatMessage({id: 'handsome'})}</p>
      <DatePicker />
      <Table 
        columns={[{
          title: 'name',
          dataIndex: 'name',
          key: "name"
        }]}
        dataSource={[{
          name: 'wq'
        }]}
        pagination={{
          total: 20,
          pageSize: 1,
          showQuickJumper: true
        }}
      />
    </div>
  )
}

export default Test