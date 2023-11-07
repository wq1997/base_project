import { theme, Table, DatePicker } from "antd";
import { ThemeBtn, LocaleBtn,BigScreen,Strategy } from "@/components";
import { useIntl } from "umi";

const Test = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  return (
    <div 
      style={{
        background: token.colorPrimary,
        color: token.colorText
      }}
    >
   <BigScreen/>
   <Strategy/>
    </div>
  )
}

export default Test