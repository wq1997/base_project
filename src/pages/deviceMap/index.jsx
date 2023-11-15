import { theme, Table, DatePicker } from "antd";
import { ThemeBtn, LocaleBtn,BigScreen,Strategy } from "@/components";
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
<<<<<<< HEAD
   <BigScreen/>
   {/* <Strategy/> */}
=======
      <BigScreen/>
      {/* <Strategy/> */}
>>>>>>> 29b35501d0588ab985a9fc69510592d34d1164c5
    </div>
  )
}

export default Test