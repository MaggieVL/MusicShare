import React from "react";
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MultipleSelectField } from "./multiple-select-field";

const genreOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "country", label: "Country"},
  { value: "punk", label: "Punk" },
  { value: "soul", label: "Soul" },
  { value: "R&B", label: "R&B" },
  { value: "jazz", label: "Jazz" },
  { value: "reggae", label: "Reggae"}
];

export const SignUpForm = (props) => {
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
    console.log(name);
    console.log(e);
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    };

  return (
   <form onSubmit={handleSubmit}>
     <TextField
        id="username"
        name="username"
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
       component={MultipleSelectField}
       options={genreOptions}
       value={genres}
     />
     <TextField
       id="password"
       name="password"
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
       variant="raised"
       color="primary"
       disabled={!isValid}
     >
       Submit
     </Button>
   </form>
 );
};
