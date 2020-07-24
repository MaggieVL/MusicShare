import React from 'react';
import AlbumForm from './album-form';
import SongService from '../../services/songService';
import { Formik } from "formik";
import * as Yup from "yup";
import formStyles from '../input-form/form-styles';

const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .required("Title is required"),
    cover: Yup.string()
        .url("Enter a valid url"),
  });

export default function AlBumCreate() {
    const classes = formStyles();
    const initialValues = {title: "", cover: ""};
    
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        
        SongService.createUserAlbum(currentUser._id || currentUser.id, values);
    }
    
    return (
        <div className={classes.container}>
            <Formik 
              render={ vProps => <AlbumForm {...vProps} /> } 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
           />
       </div>
    );
} 