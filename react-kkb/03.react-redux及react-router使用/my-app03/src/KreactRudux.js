import React, { Component } from 'react';
const ValueContext = React.createContext();

export const connect =()=>Comp=>{
    return class extends Component{
        static contextType=ValueContext
        constructor(props, context) {
            super(props, context);
            
        }
        componentDidMount(){
            const {dispatch} = this.props
            let dispatchProps;
            this.setState({
                
            })
        }
        
        render(){
            console.log(this.context)
            return<Comp ></Comp>
        }
    }
}

export class Provider extends Component {
    render() {
        return (
            <ValueContext.Provider value={this.props.store}>
                {this.props.children}
            </ValueContext.Provider>
                
        );
    }
}
