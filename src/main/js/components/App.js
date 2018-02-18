import React from "react";

import Home from "../components/Home";
import Authorization from "../components/Authorization";
import axios from "axios";
import Cookies from "js-cookie";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "../config/MuiTheme";

import {connect} from 'react-redux';
import {userActions} from '../actions/user.actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let accessToken;

        if (accessToken = localStorage.getItem('auth_token')) {
            this.props.dispatch(userActions.authenticate(accessToken));
        } else {
            this.props.dispatch(userActions.authenticate(null));
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {!this.props.auth.processed && (this.props.auth.isLoggedIn ? <Home/> : <Authorization/>)}
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, login } = state;
    return {
        auth: authentication, login
    };
}


const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as App};