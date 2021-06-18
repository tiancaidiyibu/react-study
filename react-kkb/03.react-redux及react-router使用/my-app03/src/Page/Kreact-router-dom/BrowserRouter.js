import React, { Component } from 'react';
import { createBrowserHistory } from 'history'
import { RouterCtx } from '../../utils/ctx'



class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory()
        this.state={
            location:this.history.location
        }
        this.history.listen(location=>{
            this.setState({location})
        })
    }
    
    render(){
        const { children }  = this.props
        return(
            <RouterCtx.Provider value={{history:this.history,location:this.state.location}}>
                {children}
            </RouterCtx.Provider>
            
        )
    }
}

export default BrowserRouter;