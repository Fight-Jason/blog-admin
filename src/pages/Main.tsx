
import React from 'react';
import { BrowserRouter as Router, Route,Redirect} from "react-router-dom";
import Login from './login'
import index from './index'
const Main = ():JSX.Element => {
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/" component={index} />
            <Redirect path="/login/" to={{pathname: '/login/'}} />
        </Router>
    )
}
export default Main