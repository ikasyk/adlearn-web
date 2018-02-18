import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Field, reduxForm } from 'redux-form'

const renderTextField = ({input, label, type, meta: {touched, error}}) => {
    return <TextField {...input} floatingLabelText={label} errorText={touched && error} type={type} fullWidth={true}/>
};

const validateRegistration = (values) => {
    const errors = {};

    if (!values.login) {
        errors.login = "Required";
    } else if (values.login.length < 4) {
        errors.login = "Login is too short. It must be consist minimum of 4 characters."
    } else if (/[^0-9a-z]/i.test(values.login)) {
        errors.login = "Login must contains only letters, numbers and underline _."
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = "E-mail is not valid.";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 6) {
        errors.password = "Password is too short. It must be consist minimum of 6 characters."
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords are not match."
    }

    return errors;
};

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field name="login"
                       component={renderTextField}
                       label="User Name"/>
                <Field name="email"
                       component={renderTextField}
                       label="E-mail"/>
                <Field name="password"
                       component={renderTextField}
                       type="password"
                       label="Password"/>
                <Field name="confirmPassword"
                       type="password"
                       component={renderTextField}
                       label="Confirm Password"/>
                <br/><br/>
                <RaisedButton label="SIGN UP" type="submit" primary={true}/>
            </form>
        );
    }
}

const renderedForm = reduxForm({
    form: 'signUp',
    validate: validateRegistration
})(SignUpForm);

export {renderedForm as SignUpForm};