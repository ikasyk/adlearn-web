'use strict';

import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {store} from "./helpers";

import {App} from "./components";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('wrap')
);