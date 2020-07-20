import "./helpers/helper.css";
import React from "react";
import InputForm from './input-form';

export default function SignUp() {
  const handleSubmit = (values, actions) => {
      console.log(actions);
      console.log(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
  }

  return(
          <InputForm onSubmit={handleSubmit} />
        );
}