import React, { Component } from 'react';
import { RouterCtx } from '../../utils/ctx'
import matchPath from '../../utils/matchPath';


class Switch extends Component {
    render() {
        return(
            <RouterCtx.Consumer>
                {ctx=>{
                    // 优先选用props上面location
                    const location = this.props.location||ctx.location;
                    // 找出渲染的组件，存在element中
                    let element,match
                    React.Children.forEach(this.props.children,child=>{
                        if(match==null&&React.isValidElement(child)){
                            element=child
                            const path = child.props.path;
                            match = path?matchPath(location.pathname,{...child.props,path}):ctx.match
                            console.log(match)
                        }
                    })
                    return match ? React.cloneElement(element, {location}) : null;
                }}
            </RouterCtx.Consumer>
        )
    }
}

export default Switch;