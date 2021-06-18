import React, { Component } from 'react';
import { RouterCtx } from '../../utils/ctx'


class Link extends Component {
    handel = (e,history)=>{
        e.preventDefault()
        history.push(this.props.to)
    }
    render(){
        const { to,children } = this.props
        return (
            <RouterCtx.Consumer>
                {ctx=>{
                    return <a href={to} onClick={(e)=>this.handel(e,ctx.history)}>{children}</a>
                }}
            </RouterCtx.Consumer>
            
        )
    }
}

export default Link;