import React from 'react';
import TextField from "material-ui/TextField";

const renderTextField = ({input, label}) => {
    return <TextField {...input} floatingLabelText={label}/>
};

export {renderTextField}