import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Field, reduxForm } from 'redux-form'
// import {renderTextField} from '../helpers/renderField'

import {userActions} from "../actions/user.actions";

const renderTextField = ({input, label, type, meta: {touched, error}}) => {
    return <TextField {...input} floatingLabelText={label} errorText={touched && error} type={type} fullWidth={true}/>
};

const validateLogin = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = "Required";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field name="username"
                       component={renderTextField}
                       label="User Name"/>
                <Field name="password"
                       component={renderTextField}
                       type="password"
                       label="Password"/>
                <br/><br/>
                <RaisedButton label="SIGN IN" primary={true} type="submit"/>
            </form>
        )
    }
}


const renderedForm = reduxForm({
    form: 'login',
    validate: validateLogin,
})(LoginForm);


export {renderedForm as LoginForm};