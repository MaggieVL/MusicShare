import React from 'react';

const CommentForm = (props) => {

        const {
            values: { message },
            errors,
            touched,
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
                id="message"
                name="message"
                helperText={touched.message ? errors.message : ""}
                error={touched.message && Boolean(errors.message)}
                placeholder="Your message... "
                multiline
                onChange={change.bind(null, "message")}
                value={message}
                variant="outlined"
            />
            </form>
    );

}

export default CommentForm;