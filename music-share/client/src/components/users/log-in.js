import React from 'react';
import userService from '../../services/userService';
import { Formik } from "formik";
import LogInForm from "./login-form";
import Paper from "@material-ui/core/Paper";
import formStyles from './../input-form/form-styles';
import { useHistory } from 'react-router-dom';

export default function LogIn({ setCurrentUser }){
    const initialValues = { email: "", password: ""};

    const classes = formStyles();
    const history = useHistory();

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        console.log("handleSubmit: " + values);
        await userService.postUserCredentials(values);
        setCurrentUser(JSON.parse(localStorage.getItem("current-user")));
        history.push(`/`);
    };

    return (
        <div className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
                <h1>Log in details:</h1>
                <Formik 
                    render={ vProps => <LogInForm {...vProps} /> } 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                /> 
            </Paper>
        </div>
    );
}