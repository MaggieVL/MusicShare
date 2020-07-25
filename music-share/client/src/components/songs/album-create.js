import React from 'react';
import AlbumForm from './album-form';
import AlbumService from '../../services/albumService';
import Album from '../../entities/Album';
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import formStyles from '../input-form/form-styles';

const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .required("Title is required"),
    cover: Yup.string()
        .url("Enter a valid url"),
  });

export default function AlbumCreate() {
    const classes = formStyles();
    const initialValues = {title: "", cover: ""};
    
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        const { title, cover } = values;
        const newAlbum = new Album(title, cover);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        AlbumService.createAlbum(currentUser._id || currentUser.id, newAlbum);
    }
    
    return (
        <div className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           <h1>Album details:</h1>
            <Formik 
              render={ vProps => <AlbumForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
           />
         </Paper>
       </div>
    );
} 