import React, { Component } from 'react';
import {connect} from "react-redux";

class UserPage extends Component {
    render() {
        const {logout} = this.props;
        return (
            <div>
                UserPage
                <button onClick={logout}>点击登出 </button>
            </div>
        );
    }
}

export default connect(
    ({user}) => ({isLogin: user.isLogin}),
    // mapDispatchToProps
    {
      logout: () => ({type: "LOGOUT_SUCCESS"})
    }
)(UserPage);