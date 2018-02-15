import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import axios from "axios";
import {connect} from "react-redux";
import {userActions} from "../actions/user.actions";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            login: null,
            password: null
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const target = event.target;


        axios({
            method: 'post',
            url: '/api/user/registration',
            data: {
                login: target.login.value,
                email: target.email.value,
                password: target.password.value,
                confirmPassword: target.confirmPassword.value
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    isSuccess: true,
                    login: target.login.value,
                    password: target.password.value
                });
            }
        });
    }

    handleLogin() {
        this.props.dispatch(userActions.login(this.state.login, this.state.password));
    }

    render() {
        const handleSubmit = this.handleSubmit.bind(this);
        const handleLogin = this.handleLogin.bind(this);
console.log(this.state);
        return (
            <section id="login-form-wrap">
                <h3>Sign Up</h3>
                {!this.state.isSuccess ?
                    <form onSubmit={handleSubmit}>
                        <TextField floatingLabelText="User Name" fullWidth={true} name="login"/>
                        <TextField floatingLabelText="Email" fullWidth={true} name="email"/>
                        <TextField floatingLabelText="Password" type="password" fullWidth={true} name="password"/>
                        <TextField floatingLabelText="Repeat Password" type="password" fullWidth={true}
                                   name="confirmPassword"/>
                        <br/><br/>
                        <RaisedButton label="SIGN UP" type="submit" primary={true}/>
                    </form>
                    :
                    <div>
                        <p>Your account is created. You can login using your login and password.</p>
                        <br/><br/>
                        <RaisedButton label={"Login as " + this.state.login} primary={true} onClick={handleLogin}/>
                    </div>
                }
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

const connectedSignUpForm = connect(mapStateToProps)(SignUpForm);

export { connectedSignUpForm as SignUpForm };