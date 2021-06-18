import React, {Component} from "react";
// import { bindActionCreators } from "redux";
// import {bindActionCreators} from "redux";

const ValueContext = React.createContext();


export const connect = (
  mapStateToProps=state=>state, //设置默认值
  mapDispatchToProps
  ) => (WrappedComponent) => {
  return class extends Component {
    static contextType = ValueContext
    constructor(props){
      super(props)
      this.state = {
        props:{}
      }
    }
    componentDidMount(){
      const { subscribe } = this.context
      this.update()
      subscribe(()=>{
        this.update()
      })
    }
    update(){
      const { getState,dispatch } = this.context
      let stateProps = mapStateToProps(getState())
      let dispatchProps
      if(typeof mapDispatchToProps === 'object'){
        dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
      }else if(typeof mapDispatchToProps === 'function'){
        dispatchProps = mapDispatchToProps(dispatch)
      }else{
        dispatchProps = {dispatch}
      }
      this.setState({
        props:{
          ...dispatchProps,
          ...stateProps
        }
      })
    }
    // static contextType = ValueContext
    // constructor(props){
    //   super(props)
    //   this.state = {
    //     props:{}
    //   }
    // }
    // componentDidMount(){
    //   const { subscribe } = this.context
    //   this.update()
    //   // 订阅
    //   subscribe(()=>{
    //     this.update()
    //   })

    // }
    // update(){
    //   const { getState,dispatch,subscribe } = this.context
    //   //  getState获取当前store的state
    //   let stateProps = mapStateToProps(getState())
    //   let dispatchProps
    //   // mapDispatchToProps Object/Function
    //   if(typeof mapDispatchToProps === 'object'){
    //     dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
    //   }else if(typeof mapDispatchToProps === 'function'){
    //     dispatchProps = mapStateToProps(dispatch)
    //   }else{
    //     dispatchProps = { dispatch }
    //   }
    //   this.setState({
    //     props:{
    //       ...stateProps, 
    //       ...dispatchProps
    //     }
    //   })
    // }
    render(){
      return (
        <WrappedComponent {...this.state.props}/>
      )
    }
  }
}



export class Provider extends Component {
  render (){
    return (
      <ValueContext.Provider value = {this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    )
    // return (
    //   <ValueContext.Provider value = { this.props.store }>
    //     {this.props.children}
    //   </ValueContext.Provider>
    // )
  }
}

// 

// export const connect = (
//   mapStateToProps = state => state,
//   mapDispatchToProps
// ) => WrappedComponent => {
//   return class extends Component {
//     // 此时组件的所有生命周期都能获得this.context
//     static contextType = ValueContext;
//     constructor(props) {
//       super(props);
//       this.state = {
//         props: {}
//       };
//     }
//     componentDidMount() {
//       const {subscribe} = this.context;
//       this.update();
//       // 订阅
//       subscribe(() => {
//         this.update();
//       });
//     }

//     update = () => {
//       const {getState, dispatch, subscribe} = this.context;
//       //  getState获取当前store的state
//       let stateProps = mapStateToProps(getState());
//       let dispatchProps;
//       // mapDispatchToProps Object/Function
//       if (typeof mapDispatchToProps === "object") {
//         dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
//       } else if (typeof mapDispatchToProps === "function") {
//         dispatchProps = mapDispatchToProps(dispatch, this.props);
//       } else {
//         // 默认
//         dispatchProps = {dispatch};
//       }
//       this.setState({
//         props: {
//           ...stateProps,
//           ...dispatchProps
//         }
//       });
//     };
//     render() {
//       console.log("this.context", this.context); //sy-log
//       return <WrappedComponent {...this.state.props} />;
//     }
//   };
// };

// export class Provider extends Component {
//   render() {
//     return (
//       <ValueContext.Provider value={this.props.store}>
//         {this.props.children}
//       </ValueContext.Provider>
//     );
//   }
// }

function bindActionCreator(creator, dispatch) {
  // return (...args) => dispatch(creator(...args));
  return (...args)=>dispatch(creator(...args))
}


function bindActionCreators(mapDispatchToProps,dispatch){
  const obj = {}
  for (const key in mapDispatchToProps) {
    obj[key] = bindActionCreator(mapDispatchToProps[key],dispatch)
  }
  return obj
}

// {
//     add: () => ({type: "ADD"})
//   }
export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
