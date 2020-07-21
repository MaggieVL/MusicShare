import React from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { SignUpForm } from "./signup-form";
import { LogInForm } from "./login-form";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";

const styles = theme => ({
 paper: {
   marginTop: theme.spacing.unit * 8,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
     .spacing.unit * 5}px`
 },
 container: {
   maxWidth: "200px"
 }
});

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

function InputForm(props) {
  const initialValues = { username: "", email: "", confirmPassword: "", password: "", age: 1, genres: [], imageURL: "" };

   return (
     <>
       <div className={props.container}>
         <Paper elevation={1} className={props.paper}>
           <h1>{props.simple ? "Log in details: " : "Sign up details: " }</h1>
           <Formik 
              render={ vProps => props.simple ? <LogInForm {...vProps} /> : <SignUpForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={props.onSubmit}
           />
         </Paper>
       </div>
     </>
   );
 }
 
export default withStyles(styles)(InputForm);