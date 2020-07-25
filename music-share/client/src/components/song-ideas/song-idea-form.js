import React from 'react';
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MultipleSelectField } from "../input-form/multiple-select-field";
import genreOptions from './../input-form/data/genre-options';
import FileInput from './../input-form/file-input';
import helpOptions from './../input-form/data/help-options';
import formStyles from '../input-form/form-styles';

const SongIdeaForm = (props) => {
    const {
        values: { title, help, genres, cover },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
    } = props;
          
    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const classes = formStyles();

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
                id="title"
                name="title"
                className={classes.field}
                helperText={touched.title ? errors.title : ""}
                error={touched.title && Boolean(errors.title)}
                value={title}
                onChange={change.bind(null, "title")}
                label="Title"
                variant="outlined"
            />
            <Field
                id="help"
                name="help"
                className={classes.field}
                component={MultipleSelectField}
                options={helpOptions}
                value={help}
            />
            <Field
                id="genres"
                name="genres"
                className={classes.field}
                component={MultipleSelectField}
                options={genreOptions}
                value={genres}
            />
            <Field
                id="audiofile"
                name="audiofile"
                className={classes.field}
                component={FileInput}
                title="Select an audiofile"
                setFieldValue={setFieldValue}
                errorMessage={errors["file"] ? errors["file"] : undefined}
                touched={touched["file"]}
            />    
            <TextField
                id="cover"
                name="cover"
                className={classes.field}
                helperText={touched.cover ? errors.cover : ""}
                error={touched.cover && Boolean(errors.cover)}
                value={cover}
                onChange={change.bind(null, "cover")}
                label="Cover"
                type="url"
                variant="outlined"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
            Submit
            </Button>
        </form>
    );
}
export default SongIdeaForm;