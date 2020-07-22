import React, { useState } from 'react';
import InputForm from './input-form';
import userService from '../../services/userService';

export default function LogIn(){
    const [status, setStatus] = useState("");
 
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        console.log("handleSubmit: " + values);
        userService.postUserCredentials(values);
    }

    return (
        <InputForm simple={true} onSubmit={handleSubmit}/>
    );
}