import React, { Component } from 'react';
import { RouterCtx } from '../../utils/ctx'


class Redirect extends Component {
    render() {
        return (
            <RouterCtx.Consumer>
                {
                    ctx=>{
                        const {history} = ctx
                        const {to} =this.props
                        console.log(this.props)
                        // history.push(location)
                        return <LifeCycle  onMount={()=>history.push(to)} />
                    }
                }
            </RouterCtx.Consumer>
        );
    }
}

class LifeCycle extends Component{
    componentDidMount(){
        if(this.props.onMount){
            this.props.onMount()
        }
    }
    render(){
        return null
    }
}


export default Redirect;