import { theme, Table } from "antd";
import { ThemeBtn } from "@/components"

const Test = () => {
  const { token } = theme.useToken()
  return (
    <div 
      style={{
        height: 500,
        background: token.colorPrimary,
        color: token.colorText
      }}
    >
      <ThemeBtn />

      <Table 
        columns={[{
          title: "name",
          dataIndex: 'name',
          key: "name"
        }]}
        dataSource={[{
          name: 'wq'
        }]}
      />
    </div>
  )
}

export default Test