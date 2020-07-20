import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const LogInForm = (props) => {
    return (
     <form /*onSubmit={handleSubmit}*/>
       <TextField
         id="email"
         name="email"
         label="Email"
         type="email"
         variant="outlined"
       />
       <TextField
         id="password"
         name="password"
         label="Password"
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
  