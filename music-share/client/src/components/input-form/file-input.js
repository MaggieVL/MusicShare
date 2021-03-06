import React from 'react';

export default function FileInput(props) {
    const { id, name } = props.field;
    const { className, setFieldValue } = props;

    function handleFileChange(event) {
        const file = event.target.files[0];
        setFieldValue(name, file);
    }

    return(
        <input
            id={id}
            name={name}
            className={className}
            type="file"
            onChange={handleFileChange}
        />
    );
}