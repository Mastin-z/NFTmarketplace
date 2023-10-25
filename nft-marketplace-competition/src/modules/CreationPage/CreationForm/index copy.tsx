import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../components/Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import Trait from "./Trait";

export type CreationValues = {
  name: string;
  description: string;
  image?: File;
  trait: string;
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
});

const CreationForm = ({ onSubmit }: CreationFormProps) => {
  const initialValues: CreationValues = { name: "", description: "" ,trait: ""};

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
          <Trait name="trait" placeholder="trait..." />
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm;
