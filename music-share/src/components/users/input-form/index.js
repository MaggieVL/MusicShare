import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form } from "./form";
import Paper from "@material-ui/core/Paper";

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

class InputForm extends Component {
 constructor(props) {
   super(props);
   this.state = {};
 }

 render() {
   const classes = this.props;
   return (
     <React.Fragment>
          <div className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           <h1>Form</h1>
           <Formik
             render={props => <Form {...props} />}
           />
         </Paper>
       </div>
     </React.Fragment>
   );
 }
}

export default withStyles(styles)(InputForm);