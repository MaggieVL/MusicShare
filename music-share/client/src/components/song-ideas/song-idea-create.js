import React from "react";
import SongService from '../../services/songService';
import Song from '../../entities/Song';
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
    const initialValues = {title: "", help: [], genres: [], cover: ""};
    
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        const { title, performer, genres, audiofile, cover} = values;
        let pureGenres = genres.map((genreObject) => genreObject.value);
  
        const newSong = new Song(title, performer, pureGenres, audiofile, cover);
        console.log(newSong);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        console.log(currentUser);
        SongService.createSong(currentUser._id || currentUser.id, newSong, audiofile);
    }
    
    return (
        <div className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           <h1>Song details:</h1>
            <Formik 
              render={ vProps => <SongIdeaForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
           /> 
         </Paper>
       </div>
    );
}