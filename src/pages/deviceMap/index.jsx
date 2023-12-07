import { theme, Table, DatePicker } from "antd";
import { ThemeBtn, LocaleBtn,BigScreen } from "@/components";
import { useIntl } from "umi";

const Test = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  return (
    <div 
      style={{
        color: token.colorText
      }}
    >
      <BigScreen/>
    </div>
  )
}

export default Test