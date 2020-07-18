import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import CustomClearIndicator from './custom-clear-indicator'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const genres = [
  {
    value: "pop",
    label: "Pop"
  },
  "Rock",
  "Country",
  "Punk",
  "Soul",
  "R&B",
  "Jazz"
]

export const Form = (props) => {
  const classes = useStyles();
  
  return (
   <form onSubmit={() => {}} autoComplete="on">
     <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
     />
     <TextField
       id="email"
       name="email"
       label="Email"
       type="email"
       variant="outlined"
     />
     <TextField
       id="age"
       name="age"
       label="Age"
       type="number"
       variant="outlined"
     />
    <CustomClearIndicator options={genres}/>
     <TextField
       id="password"
       name="password"
       label="Password"
       type="password"
       variant="outlined"
     />
     <TextField
       id="confirmPassword"
       name="confirmPassword"
       label="Confirm Password"
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
