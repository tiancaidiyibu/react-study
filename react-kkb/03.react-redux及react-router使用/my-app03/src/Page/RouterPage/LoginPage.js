import React, { Component } from 'react';
// import {Route, Redirect} from 'react-router-dom'
import Redirect from '../Kreact-router-dom/Redirect'

import {connect} from "react-redux";



class LoginPage extends Component {
    render() {
        const {isLogin, login, location} = this.props;
        const {redirect = "/"} = location.state || {};
        console.log("props", this.props); //sy-log
        if (isLogin) {
          // 已经登录
          return <Redirect to={{pathname:redirect}} />;
        } else {
          return (
            <div>
              <h3>LoginPage</h3>
              <button onClick={login}>点击登录</button>
            </div>
          );
        }
      }
}

export default connect(
    // mapStateToProps
  ({user}) => ({isLogin: user.isLogin}),
  // mapDispatchToProps
  {
    login: () => ({type: "LOGIN_SUCCESS"})
  }
)(LoginPage);