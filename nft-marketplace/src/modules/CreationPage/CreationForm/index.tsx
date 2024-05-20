import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../components/Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import Trait from "./Trait";
import Trait1 from "./Trait1";
import Trait2 from "./Trait2";
import Trait3 from "./Trait3";
import Trait4 from "./Trait4";
import Trait5 from "./Trait5";
import Trait6 from "./Trait6";
import Trait7 from "./Trait7";

export type CreationValues = {
  name: string;
  description: string;
  image?: File;
  trait: string;
  trait1: string;
  trait2: string;
  trait3: string;
  trait4: string;
  trait5: string;
  trait6: string;
  trait7: string;
  
};

type CreationFormProps = {
  onSubmit: (values: CreationValues) => Promise<void>;
};

export const creationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter a name"),
  description: Yup.string().required("Must enter a description"),
  image: Yup.mixed().test("is_defined", "Must select an image", (value) =>
    Boolean(value)
  ),
  trait: Yup.string().required("Please enter the number 0-1"),
  trait1: Yup.string().required("Please enter the number 0-1"),
  trait2: Yup.string().required("Please enter the number 0-1"),
  trait3: Yup.string().required("Please enter the number 0-1"),
  trait4: Yup.string().required("Please enter the number 0-1"),
  trait5: Yup.string().required("Please enter the number 0-1"),
  trait6: Yup.string().required("Please enter the number 0-1"),
  trait7: Yup.string().required("Please enter the number 0-1"),

});

const CreationForm = ({ onSubmit }: CreationFormProps) => {
  const initialValues: CreationValues = { name: "", description: "" ,trait: "",trait1: "",trait2: "",trait3: "",trait4: "",trait5: "",trait6: "",trait7: ""};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={creationValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={onSubmit}
    >
      <Form className="flex">
        <ImagePicker name="image" className="mr-4" />
        <div className="flex w-64 flex-col space-y-1">
          <FormikInput name="name" placeholder="name" />
          <TextArea name="description" placeholder="description..." />
          <div className="traits-row">
            <Trait name="trait" placeholder="trait1..." />
            <Trait1 name="trait1" placeholder="trait2..." />
            <Trait2 name="trait2" placeholder="trait3..." />
            <Trait3 name="trait3" placeholder="trait4..." />
          </div>

          <div className="traits-row">
            <Trait4 name="trait4" placeholder="trait5..." />
            <Trait5 name="trait5" placeholder="trait6..." />
            <Trait6 name="trait6" placeholder="trait7..." />
            <Trait7 name="trait7" placeholder="trait8..." />
          </div>
          
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm;
