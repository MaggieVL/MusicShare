import "./helpers/helper.css";
import React, { useState } from "react";
import InputForm from './input-form';
import UserService from '../../services/userService';
import User from './../../entities/User';

export default function SignUp() {
  const [status, setStatus] = useState("");
 
  const handleSubmit = (values, actions) => {
      actions.setSubmitting(false);
      const { username, email, password, age, genres, imageURL} = values;
      let pureGenres = genres.map((genreObject) => genreObject.value);

      const newUser = new User(username, email, password, age, pureGenres, imageURL);
      UserService.createUser(newUser);

      setStatus("Successfully signed in");
  }

  return(
    <>
          <InputForm onSubmit={handleSubmit} />
          <h1>{status}</h1>
    </>
        );
}