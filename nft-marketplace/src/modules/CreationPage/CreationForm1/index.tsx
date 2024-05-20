import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../components/Input";
import SubmitButton1 from "./SubmitButton1";
import Trait from "./Trait";
import Trait1 from "./Trait1";
import Trait2 from "./Trait2";
import Trait3 from "./Trait3";
import  UpgradesData  from "../../../components/calculation";
import {GetNFTData} from "components/calculation";


export type CreationValues1 = {
  
  wash_sales_usd: string;
  wash_transactions: string;
  wash_sales_percentage: string;
  trade_profit_usd: string;
};

type CreationFormProps = {
  onSubmit: (values: CreationValues1) => Promise<void>;
};

export const creationValidationSchema = Yup.object().shape({
  wash_sales_usd: Yup.string().required("Please enter the number 0-1"),
  wash_transactions: Yup.string().required("Please enter the number 0-1"),
  wash_sales_percentage: Yup.string().required("Please enter the number 0-1"),
  trade_profit_usd: Yup.string().required("Please enter the number 0-1"),
});

const CreationForm1 = ({ onSubmit }: CreationFormProps) => {
  const initialValues: CreationValues1 = { wash_sales_usd: "",wash_transactions: "",wash_sales_percentage: "",trade_profit_usd: ""};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={creationValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={async (values) => {
        // console.log("Form values:", values); // 添加这行以打印表单值
        await UpgradesData({ formValues: values });
        
      }}
      
      // onSubmit={onSubmit}
    >
    
      <Form className="flex">
       
        <div className="flex w-64 flex-col space-y-1">
            <Trait name="wash_sales_usd" placeholder="wash_sales_usd..." />
            <Trait1 name="wash_transactions" placeholder="wash_transactions..." />
            <Trait2 name="wash_sales_percentage" placeholder="wash_sales_percentage..." />
            <Trait3 name="trade_profit_usd" placeholder="trade_profit_usd..." />
          <GetNFTData />
          <SubmitButton1 />
          
          
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm1;
