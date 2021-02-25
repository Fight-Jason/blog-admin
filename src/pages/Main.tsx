
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './login'
import index from './index'
import ArticleList from './articlelist';
import AddArticle from './addArticle';
const Main = ():JSX.Element => {
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/" exact component={index} />
            <Route path="/index/" exact component={ArticleList} />
            <Route path="/index/list" exact component={AddArticle} />
        </Router>
    )
}
export default Main