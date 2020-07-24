import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import formStyles from '../input-form/form-styles';

const LogInForm = (props) => {
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

  const classes = formStyles();

  return (
     <form onSubmit={handleSubmit} className={classes.form}>
       <TextField
         id="email"
         name="email"
         label="Email"
         className={classes.field}
         value={email}
         onChange={change.bind(null, "email")}
         type="email"
         variant="outlined"
       />
       <TextField
         id="password"
         name="password"
         label="Password"
         className={classes.field}
         value={password}
         onChange={change.bind(null, "password")}
         type="password"
         variant="outlined"
       />
       <Button
         type="submit"
         variant="contained"
         color="primary"
       >
         Submit
       </Button>
     </form>
   );
};

export default LogInForm;