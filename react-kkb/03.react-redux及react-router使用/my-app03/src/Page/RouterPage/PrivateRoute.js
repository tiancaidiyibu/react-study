import React, { Component } from 'react';
import Redirect from '../Kreact-router-dom/Redirect'
import Route from '../Kreact-router-dom/Route'

// import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";


class PrivateRoute extends Component {
    render() {
        const {isLogin,path,component}=this.props
        if(isLogin){
            return <Route path={path} component={component} />
        }else{
            return<Redirect to={{pathname:'/login',state:{redirect:path}}}/>
        }
    }
}

export default connect(
    ({user}) => ({isLogin: user.isLogin})
)(PrivateRoute);