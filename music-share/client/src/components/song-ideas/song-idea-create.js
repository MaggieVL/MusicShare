import React, { useState } from "react";
import SongIdeaService from '../../services/songIdeaService';
import SongIdea from '../../entities/SongIdea';
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import formStyles from '../input-form/form-styles';
import SongIdeaForm from './song-idea-form';

const validationSchema = Yup.object({
    title: Yup.string("Enter a title"),
    help: Yup.array()
        .min(1, 'Pick at least 1 tag')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            })
        ),
    genres: Yup.array()
        .of(
            Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
            })
        ),
    audiofile: Yup
        .mixed()
        .required("A file is required"),
    cover: Yup.string()
        .url("Enter a valid url"),
  });

export default function SongCreate() {
    const classes = formStyles();
    const initialValues = {title: "", help: [], genres: [], audiofile: null, cover: ""};
    const [status, setStatus] = useState("");

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        const { title, help, genres, audiofile, cover} = values;
        let pureGenres = genres.map((genreObject) => genreObject.value);
        let pureHelp = help.map((helpObject) => helpObject.value);
        const newSongIdea = new SongIdea(title, pureHelp, pureGenres, audiofile, cover);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        
        try {
            await SongIdeaService.createSongIdea(currentUser._id || currentUser.id, newSongIdea, audiofile);
            setStatus("Successful");
          } catch (errorMessage) {
            setStatus(errorMessage);
          }

    }
    
    return (
        <div className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           <h1>Song Idea details:</h1>
            <Formik 
              render={ vProps => <SongIdeaForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
           /> 
         </Paper>
         <h1>{status}</h1>
       </div>
    );
}