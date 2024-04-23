import { theme, Table, DatePicker, Form, Button } from "antd";
import { ThemeBtn, LocaleBtn, EditTable, Flow, ScrollTable, ToggleButton } from "@/components";
import { useIntl } from "umi";
import flowImg from "./background.png";
import styles from "./index.less";

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
      <ToggleButton
        freezeTime={5}
        onClick={()=>{
          alert("点击")
        }}
      >
        下发
      </ToggleButton>
      <div style={{height: 200}}>
        <div style={{width: '5px', height: '200px',position: "absolute", left: 200}}>
          <div style={{width: 200, height: 5, position: 'absolute', left: 0, top: 0,transform: "rotate(90deg)", transformOrigin: '0px 0px', background: 'blue'}}>
            <Flow img={flowImg}/>
          </div>
        </div>
        <div style={{width: '5px', height: '200px',position: "absolute", left: 400}}>
          <div style={{width: 200, height: 5,position: 'absolute', top: 200, transform: "rotate(-90deg)", transformOrigin: '0px 0px'}}>
            <Flow img={flowImg}/>
          </div>
        </div>
        <div style={{width: '1000px', height: '5px'}}>
          <Flow img={flowImg}/>
        </div>
      </div>

      <div style={{height: 100}}>
        <ScrollTable 
            columns={[
              {title: "A", key: "A"},
              {title: "B", key: "B"},
              {title: "C", key: "C"},
              {title: "D", key: "D"}
            ]}
            dataSource={[
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              },
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              },
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              }
            ]}
        />
      </div>
      <div style={{height: 100}}>
        <ScrollTable 
            columns={[
              {title: "A", key: "A"},
              {title: "B", key: "B"},
              {title: "C", key: "C"},
              {title: "D", key: "D"}
            ]}
            dataSource={[
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              },
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              },
              {
                A: "A",
                B: "B",
                C: "C",
                D: "D"
              }
            ]}
        />
      </div>
      <div 
        className={styles.element} 
      />
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