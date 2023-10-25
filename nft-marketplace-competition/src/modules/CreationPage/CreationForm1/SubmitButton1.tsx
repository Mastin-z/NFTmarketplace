import React from "react";
import { useFormikContext } from "formik";
import Button from "../../../components/Button";

const SubmitButton = () => {
  const formik = useFormikContext();

  return (
    <Button loading={formik.isSubmitting} onClick={formik.submitForm}>
      Upgrade
    </Button>
  );
};

export default SubmitButton;
