import React, { Component } from 'react';
// import { BrowserRouter,HashRouter,MemoryRouter, Link, Route, Router, Switch } from "react-router-dom";
import BrowserRouter from '../Kreact-router-dom/BrowserRouter'
import Route from '../Kreact-router-dom/Route'
import Link from '../Kreact-router-dom/Link'
import Switch from '../Kreact-router-dom/Switch'
import Redirect from '../Kreact-router-dom/Redirect'



import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";




class RouterPage extends Component {
    render() {
        return (
            <div>
                <BrowserRouter basename='/ikki'>
                    <nav>
                        <Link to='/'>首页</Link>
                        <Link to='/user'>用户中心</Link>
                        <Link to='/children'>children</Link>
                        <Link to='/render'>render</Link>
                        <Link to='/search/123' >search</Link>
                        <Link to='/login'>登录</Link>
                    </nav>
                    {/* <Switch location={{pathname:'/user'}}> */}
                    <Switch >
                        <Route exact path='/' component={HomePage}></Route>
                        {/* <Route path='/user' component={UserPage}></Route> */}
                        <Route path='/children' children={()=><div>children</div>}></Route>
                        <Route path='/render' render={()=><div>render</div>}></Route>
                        <Route path='/search/:id' component={searchComp}></Route>
                        <PrivateRoute path='/user' component={UserPage}/>
                        <Route path='/login' component={LoginPage}></Route>
                        <Route render={()=><div>404</div>} ></Route>
                    </Switch>



                
                
                </BrowserRouter>
            </div>
        );
    }
}
function detailComp (props){

    return <div>
        detailComp
    </div>
}

function searchComp (props){
    const {id} = props.match.params
    return <div>
        searchComp:-{id}
        <Link to='/search/123/detail/456' >详情</Link>
        <Route path='/search/:id/detail' component={detailComp}></Route>
    </div>
}

export default RouterPage;