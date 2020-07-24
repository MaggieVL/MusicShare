import React from 'react';

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
        const { title, genres, cover} = values;
        let pureGenres = genres.map((genreObject) => genreObject.value);

        const newAlbum = new Album(title, pureGenres, cover);
        console.log(newAlbum);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        console.log(currentUser);
        SongService.createUserAlbum(currentUser._id || currentUser.id, newSong, audiofile);
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