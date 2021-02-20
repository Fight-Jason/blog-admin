
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './login'
import index from './index'
function Main(): JSX.Element{
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/" exact component={index} />
        </Router>
    )
}
export default Main