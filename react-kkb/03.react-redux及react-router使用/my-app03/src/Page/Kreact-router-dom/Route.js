import React, { Component } from 'react';
import { RouterCtx } from '../../utils/ctx'
import matchPath from '../../utils/matchPath'

class Route extends Component {
    render(){
        // console.log(this.props)
        const { children,component,render,path } = this.props
        return(
            <RouterCtx.Consumer>
                {ctx=>{
                    
                    const location = this.props.location||ctx.location
                    // const match = ctx.location.pathname === path
                    const match = matchPath(location.pathname,this.props)
                    const props={
                        ...ctx,
                        location,
                        match,
                    }
                    // children,component,render可以接收到 (history,location,match)
                    // 所以我们定义props传下去

                    // match 渲染 children,component,render或者null
                    // match时候如果children存在：function或者children本身
                    // 不match渲染children或者null
                    // children与匹配无关
                    return <RouterCtx.Provider value={props}>
                        {match ? 
                    (children ?
                        (typeof children === 'function'?children(props):children)
                        : (component ? 
                            (React.createElement(component,props)) 
                            : (render ? render(props):null)
                        )
                    ) 
                    : (typeof children  === 'function' ? children(props) : null)}
                    </RouterCtx.Provider>

                    // return match ? React.createElement(component,this.props):null
                }}
            </RouterCtx.Consumer>
        )
    }
}

export default Route;