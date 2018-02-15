import React from "react";
import {LearnDataList, TopNavbar} from "./";
import $ from "jquery";
import {Route, Switch, Redirect} from "react-router-dom";
import { LearnPage } from './LearnPage';

class Home extends React.Component {
    render() {
        $('body').removeClass('image-wrap');

        return (
            <div>
                <TopNavbar/>
                <div className="container">
                    <Switch>
                        <Redirect to="/" from="/sign-up"/>
                        <Route exact path="/" component={LearnDataList}/>
                        <Route path="/learn/:id" component={LearnPage}/>
                    </Switch>
                </div>
            </div>
        );
    }

}

export default Home;