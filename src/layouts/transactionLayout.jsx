
import MyMenu from "@/permissions/transactionMenu";
import CommonLayout from "./commonLayout";

const TransactionLayout = () => {
   return (
        <CommonLayout 
            MyMenu={MyMenu}
            title="现货交易平台"
        />
   )
};

export default TransactionLayout;
