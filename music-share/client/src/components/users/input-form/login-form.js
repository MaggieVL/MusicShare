import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const LogInForm = (props) => {
  const {
    values: {email, password},
    handleSubmit,
    handleChange,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    console.log(name);
    console.log(e);
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
     <form onSubmit={handleSubmit}>
       <TextField
         id="email"
         name="email"
         label="Email"
         value={email}
         onChange={change.bind(null, "email")}
         type="email"
         variant="outlined"
       />
       <TextField
         id="password"
         name="password"
         label="Password"
         value={password}
         onChange={change.bind(null, "password")}
         type="password"
         variant="outlined"
       />
       <Button
         type="submit"
         variant="raised"
         color="primary"
       >
         Submit
       </Button>
     </form>
   );
};
  