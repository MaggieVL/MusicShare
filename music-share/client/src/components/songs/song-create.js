import React, { useState } from "react";
import SongService from '../../services/songService';
import Song from '../../entities/Song';
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import formStyles from '../input-form/form-styles';
import SongForm from './song-form';

const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .required("Title is required"),
    performer: Yup.string("Enter the Performer")
        .required("The performer is required"),
    genres: Yup.array()
        .min(1, 'Pick at least 1 tag')
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
        ),
    audiofile: Yup
        .mixed()
        .required("A file is required")
        /*.test(
          "fileSize",
          "File too large",
          value => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )*/,
    cover: Yup.string()
        .url("Enter a valid url"),
  });

export default function SongCreate() {
    const classes = formStyles();
    const initialValues = {title: "", performer: "", genres: [], audiofile: null, cover: ""};
    const [status, setStatus] = useState("");

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        const { title, performer, genres, audiofile, cover} = values;
        let pureGenres = genres.map((genreObject) => genreObject.value);
  
        const newSong = new Song(title, performer, pureGenres, audiofile, cover);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));

        try {
          await SongService.createSong(currentUser._id || currentUser.id, newSong, audiofile);
          setStatus("Successful");
        } catch (errorMessage) {
          setStatus(errorMessage);
        }
        
        
    }
    
    return (
        <div className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           <h1>Song details:</h1>
            <Formik 
              render={ vProps => <SongForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
           /> 
         </Paper>
       </div>
    );
}