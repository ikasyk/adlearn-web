import Cookies from "js-cookie";
import axios from "axios";

class Auth {
    constructor(onDone, onFail) {
        let accessToken;

        if (accessToken = Cookies.get('auth-token')) {
            axios({
                method: 'post',
                url: '/api/user/info',
                headers: {'Authrization': accessToken}
            })
                .then(response => {
                    onDone(response);
                })
                .catch(() => {
                    onFail();
                });

        } else {
            onFail();
        }
    }
}

export function autoAuth() {
    let accessToken;

    if (accessToken = Cookies.get('auth-token')) {
        console.log('found access token: ' + accessToken);
        axios({
            method: 'post',
            url: '/api/user/info',
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
            .then(response => {
                this.setState({isUserAuthorized: true});
            })
            .catch(() => {
                this.setState({isUserAuthorized: false});
            })
    }
}

export default Auth;