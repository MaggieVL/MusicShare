import React from "react";
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MultipleSelectField } from "../input-form/multiple-select-field";
import genreOptions from './../input-form/data/genre-options';
import formStyles from '../input-form/form-styles';

const SignUpForm = (props) => {
  const {
    values: { username, email, password, confirmPassword, age, genres, imageURL },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
  } = props;
      
  const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
  };

  const classes = formStyles();

  return (
   <form onSubmit={handleSubmit} className={classes.form}>
     <TextField
        id="username"
        name="username"
        className={classes.field}
        helperText={touched.username ? errors.username : ""}
        error={touched.username && Boolean(errors.username)}
        value={username}
        onChange={change.bind(null, "username")}
        label="Username"
        variant="outlined"
     />
     <TextField
       id="email"
       name="email"
       className={classes.field}
       helperText={touched.email ? errors.email : ""}
       error={touched.email && Boolean(errors.email)}
       value={email}
       onChange={change.bind(null, "email")}
       label="Email"
       type="email"
       variant="outlined"
     />
     <TextField
       id="age"
       name="age"
       className={classes.field}
       helperText={touched.age ? errors.age : ""}
       error={touched.age && Boolean(errors.age)}
       value={age}
       onChange={change.bind(null, "age")}
       label="Age"
       type="number"
       variant="outlined"
     />
     <TextField
       id="imageURL"
       name="imageURL"
       className={classes.field}
       helperText={touched.imageURL ? errors.imageURL : ""}
       error={touched.imageURL && Boolean(errors.imageURL)}
       value={imageURL}
       onChange={change.bind(null, "imageURL")}
       label="Image url"
       type="url"
       variant="outlined"
     />
     <Field
       id="genres"
       name="genres"
       className={classes.field}
       component={MultipleSelectField}
       options={genreOptions}
       value={genres}
     />
     <TextField
       id="password"
       name="password"
       className={classes.field}
       helperText={touched.password ? errors.password : ""}
       error={touched.password && Boolean(errors.password)}
       label="Password"
       type="password"
       value={password}
       onChange={change.bind(null, "password")}
       variant="outlined"
     />
     <TextField
       id="confirmPassword"
       name="confirmPassword"
       className={classes.field}
       helperText={touched.confirmPassword ? errors.confirmPassword : ""}
       error={touched.confirmPassword && Boolean(errors.confirmPassword)}
       label="Confirm Password"
       type="password"
       value={confirmPassword}
       onChange={change.bind(null, "confirmPassword")}
       variant="outlined"
     />
     <Button
       type="submit"
       variant="contained"
       color="primary"
       disabled={!isValid}
     >
       Submit
     </Button>
   </form>
 );
};

export default SignUpForm;