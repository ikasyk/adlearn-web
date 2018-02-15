import axios from "axios";
import queryString from 'query-string';
import Cookies from "js-cookie";

import { userConst } from "../constants";

export const userActions = {
    authenticate,
    login
};

function authenticate(accessToken) {
    return dispatch => {
        if (accessToken === null) {
            dispatch(failed());
            return;
        }
        dispatch(request());

        axios({
            method: 'post',
            url: '/api/user/info',
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => {
            const data = response.data;

            dispatch(success(data, accessToken));
        }).catch(error => {
            dispatch(failed());
        })
    };

    function request() {
        return {type: userConst.AUTH_REQUEST};
    }

    function failed() {
        return {type: userConst.AUTH_FAILED};
    }

    function success(data, accessToken) {
        return {type: userConst.AUTH_SUCCESS, accessToken, data};
    }
}

function login(username, password) {
    return dispatch => {
        dispatch(request());

        axios({
            url: '/oauth/token',

            data: queryString.stringify({
                grant_type: "password",
                username: username,
                password: password
            }),

            method: 'post',

            headers: {
                "Authorization": "Basic YWRsZWFybmNsaWVudDoxcTJ3M2U0cjVycmc0NHR0",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            const data = response.data;

            const cookieOpts = {
                expires: data.expires_in / (3600 * 24),
                path: '/'
            };
            Cookies.set('auth-token', data.access_token, cookieOpts);

            dispatch(success(data));

            dispatch(userActions.authenticate(data.access_token));
        }).catch(error => {
            dispatch(failed());
        });
    };

    function request() {
        return {type: userConst.LOGIN_REQUEST};
    }

    function failed() {
        return {type: userConst.LOGIN_FAILED};
    }

    function success(data) {
        return {type: userConst.LOGIN_SUCCESS, data};
    }
}