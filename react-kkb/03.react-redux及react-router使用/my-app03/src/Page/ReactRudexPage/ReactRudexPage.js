import React, { Component } from 'react';
import { connect } from "../../KreactRudux";
import { bindActionCreators } from 'redux';

class ReactRudexPage extends Component {
    render() {
        console.log(this.props)
        const {count,dispatch,add} = this.props
        return (
            <div>
                ReactRudexPage
                <p>{count}</p>
                <button onClick={()=>dispatch({type:'ADD'})}>add</button>
                <button onClick={add}>add2</button>
            </div>
        );
    }
}

export default connect(
    // mapStateToProps是Function(state,ownProps)
    // state=>({count:state})
    (state,ownProps)=>{
        // console.log('own',ownProps) //{msg:'msg'}  是组件本身的props,谨慎使用（如果指定了了，那么只 要组件接收到新的 props，mapStateToProps 就会被调 ⽤用，mapStateToProps 都会被重新计 算）
        return{
            count:state
        }
    },
    //mapDispatchToProps (Object or Function)
    // {
    //     add:()=>({type:'ADD'})
    // }
    (dispatch)=>{
        // const res={add:()=>dispatch({type:'ADD'})}
        let res={add:()=>({type:'ADD'})}
        res = bindActionCreators(res,dispatch)
        return {
            dispatch,
            ...res
        }
    }
)(ReactRudexPage);