import React from 'react';
import { TopNavbar, LoginFormWrap, SignUpFormWrap } from './';
import $ from 'jquery';
import {Route, Switch} from "react-router-dom";

class Authorization extends React.Component {
    render() {
        $('body').addClass('image-wrap');

        return (
            <div>
                <TopNavbar transparent={true} />
                <Switch>
                    <Route exact path="/" component={LoginFormWrap}/>
                    <Route path="/sign-up" component={SignUpFormWrap}/>
                </Switch>
            </div>
        );
    }

}

export default Authorization;