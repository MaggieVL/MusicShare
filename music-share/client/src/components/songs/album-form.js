import React from 'react';
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AlbumForm = (props) => {
    const {
        values: { title, cover },
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

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="title"
                name="title"
                helperText={touched.title ? errors.title : ""}
                error={touched.title && Boolean(errors.title)}
                value={title}
                onChange={change.bind(null, "title")}
                label="Title"
                variant="outlined"
            />
            <TextField
                id="cover"
                name="cover"
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
                variant="raised"
                color="primary"
                disabled={!isValid}
            >
            Submit
            </Button>
        </form>
    );
};

export default AlbumForm;