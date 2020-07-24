import React from "react";
import SignUpForm from './signup-form';
import UserService from '../../services/userService';
import User from './../../entities/User';
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import formStyles from './../input-form/form-styles';

const validationSchema = Yup.object({
  username: Yup.string("Enter a name")
      .required("Name is required"),
  email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  password: Yup.string("")
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  age: Yup.number("Enter your age")
      .min(1,"Age must be at least 1")
      .integer("Age must be a positive integer")
      .required("Enter your age"),
  genres: Yup.array()
      .min(1, 'Pick at least 1 tag')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
  imageURL: Yup.string()
      .url("Enter a valid url"),
});

export default function SignUp() {
  const classes = formStyles();
  
  const initialValues = { username: "", email: "", confirmPassword: "", password: "", age: 1, genres: [], imageURL: "" };
 
  const handleSubmit = (values, actions) => {
      actions.setSubmitting(false);
      const { username, email, password, age, genres, imageURL} = values;
      let pureGenres = genres.map((genreObject) => genreObject.value);

      const newUser = new User(username, email, password, age, pureGenres, imageURL);
      UserService.createUser(newUser);
  }

  return(
       <div className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
              <h1>Sign up details:</h1>
                <Formik 
                  render={ vProps => <SignUpForm {...vProps} /> } 
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
              /> 
            </Paper>
       </div>
  );
}
