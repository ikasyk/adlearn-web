import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import {connect} from "react-redux";
import {userActions} from "../actions/user.actions";
import { form, control, button } from 'react-validation';

const required = (value) => {
    if (value.toString().trim().length === 0)
        return "Required";
    return false;
};

const FormValid = ({getValues, validate, validateAll, showError, hideError, children, ...props}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        validateAll();
        props.submit(getValues());
    };
    return <form {...props} onSubmit={handleSubmit}>{children}</form>
};

const TextFieldValid = ({error, isChanged, isUsed, ...props}) => {
    return <TextField errorText={isUsed && error} {...props}/>
};

const ButtonSubmitValid = ({hasErrors, ...props}) => {
    const handleClick = () => {
        if (!hasErrors) props.sendForm();
    };
    return <RaisedButton type='submit' {...props} onClick={handleClick}/>
};

const Form = form(FormValid);
const Input = control(TextFieldValid);
const Button = button(ButtonSubmitValid);


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit({username, password}) {
        this.props.dispatch(userActions.login(username, password));
    }

    render() {
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <section id="login-form-wrap">
                <h3>Sign In</h3>
                <Form submit={handleSubmit}>
                    <Input floatingLabelText="User Name" fullWidth={true} name="username"
                                    validations={[required]}/>
                    <Input floatingLabelText="Password" type="password" fullWidth={true} name="password"
                                    validations={[required]}/>
                    <br/><br/>
                    <Button label="SIGN IN" primary={true}/>
                </Form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {login} = state;
    return {
        login
    }
}

const connectedLoginForm = connect(mapStateToProps)(LoginForm);

export {connectedLoginForm as LoginForm};