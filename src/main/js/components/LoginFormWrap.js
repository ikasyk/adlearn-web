import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import {connect} from "react-redux";
import {userActions} from "../actions/user.actions";

import { LoginForm } from './LoginForm'

class LoginFormWrap extends React.Component {
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
                <LoginForm onSubmit={handleSubmit}/>
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

const connectedLoginFormWrap = connect(mapStateToProps)(LoginFormWrap);

export {connectedLoginFormWrap as LoginFormWrap};