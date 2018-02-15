import React from 'react';
import { TopNavbar, LoginForm, SignUpForm } from './';
import $ from 'jquery';
import {Route, Switch} from "react-router-dom";

class Authorization extends React.Component {
    render() {
        $('body').addClass('image-wrap');

        return (
            <div>
                <TopNavbar transparent={true} />
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/sign-up" component={SignUpForm}/>
                </Switch>
            </div>
        );
    }

}

export default Authorization;