import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Admin from "./components/layout/Admin";
import TestView from "./test/TestView";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" render={(props) => <Admin />} />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
