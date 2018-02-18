import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import axios from "axios";
import {connect} from "react-redux";
import {userActions} from "../actions/user.actions";

import {SignUpForm} from './SignUpForm';

class SignUpFormWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            login: null,
            password: null
        };
    }

    handleSubmit({login, email, password, confirmPassword}) {
        axios({
            method: 'post',
            url: '/api/user/registration',
            data: {
                login: login,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    isSuccess: true,
                    login: login,
                    password: password
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

        return (
            <section id="login-form-wrap">
                <h3>Sign Up</h3>
                {!this.state.isSuccess ?
                    <SignUpForm onSubmit={handleSubmit}/>
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

const connectedSignUpForm = connect(mapStateToProps)(SignUpFormWrap);

export { connectedSignUpForm as SignUpFormWrap };