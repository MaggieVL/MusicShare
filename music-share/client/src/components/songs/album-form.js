import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import formStyles from '../input-form/form-styles';

const AlbumForm = (props) => {
    const {
        values: { title, cover },
        errors,
        touched,
        handleChange,
        isValid,
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
};

export default AlbumForm;