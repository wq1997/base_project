import { theme, Table } from "antd";
import { ThemeBtn } from "@/components"

const Login = () => {
  const { token } = theme.useToken()
  return (
    <div 
      style={{
        height: 500,
        background: token.colorPrimaryBg,
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

export default Login