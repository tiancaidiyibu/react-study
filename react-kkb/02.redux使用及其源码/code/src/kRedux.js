export function createStore(reducer,enhancer){
  // if(enhancer){
  //   return enhancer(createStore)(reducer)
  // }
  // let currentState = undefined
  // let currentListeners = []
  // function getState(){
  //   return currentState
  // }
  // function dispatch(action){
  //   currentState = reducer(currentState,action)
  //   // 监听函数是一个数组，那就循环吧
  //   currentListeners.forEach(listener=>listener())
  // }
  // function subscribe(listener){
  //   currentListeners.push(listener)
  // }
  // // 第一次dispach设置初始值
  // dispatch({type:'@init'})
  // return {
  //   getState,
  //   dispatch,
  //   subscribe
  // }
  if(enhancer){
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined
  let currentListeners = []
  function getState(){
    return currentState
  }
  function dispatch(action){
    currentState = reducer(currentState,action)
    currentListeners.forEach(listener=>listener())
  }
  function subscribe(listener){
    currentListeners.push(listener)
  }

  return {
    dispatch,
    getState,
    subscribe
  }
}

export function applyMiddleware(...middlewares){
  return createStore => (...args) => {
    let store = createStore(...args)
    let dispatch = store.dispatch
    const middleApi = {
      getState : store.getState,
      dispatch
    }
    const middlewaresChain  = middlewares.map(middleware=>middleware(middleApi))
    dispatch = compose(...middlewaresChain)(dispatch)
    return {
      ...store,
      dispatch
    }
  }

  function compose(...funcs){
    if(funcs.length === 0){
      return arg => arg;
    }
    if( funcs.length === 1 ){
      return funcs[0]
    }
    const reduce = funcs.reduce((prev,cur)=>(...args)=>prev(cur(...args)))
  }
  // return (createStore)=>(...args)=>{
  //   const store = createStore(...args)
  //   let dispatch = store.dispatch
  //   const middleApi = {
  //     getState :store.getState,
  //     dispatch
  //   }
  //   const middlewaresChain = middlewares.map(middleware=>middleware(middleApi))
  //   dispatch = compose(...middlewaresChain)(dispatch)
  //   return {
  //     ...store,
  //     dispatch
  //   }
  // }
}











// export function createStore(reducer, enhancer) {
//   if (enhancer) {
//     return enhancer(createStore)(reducer);
//   }
//   let currentState = undefined;
//   let currentListeners = [];
//   function getState() {
//     return currentState;
//   }
//   function dispatch(action) {
//     currentState = reducer(currentState, action);
//     // 监听函数是一个数组，那就循环吧
//     currentListeners.map(listener => listener());
//   }

//   //订阅，可以多次订阅
//   function subscribe(listener) {
//     // 每次订阅，把回调放入回调数组
//     currentListeners.push(listener);
//   }

//   // 取值的时候，注意一定要保证不和项目中的会重复
//   dispatch({type: "@INIT/REDUX-KKB"});

//   return {
//     getState,
//     dispatch,
//     subscribe
//   };
// }

// export function applyMiddleware(...middlewares) {
//   return createStore => (...args) => {
//     const store = createStore(...args);
//     let dispatch = store.dispatch;
//     const middleApi = {
//       getState: store.getState,
//       dispatch
//     };
//     // 给middleware参数，比如说dispatch
//     const middlewaresChain = middlewares.map(middleware =>
//       middleware(middleApi)
//     );
//     console.log(middlewaresChain[0])
//     dispatch = compose(...middlewaresChain)(dispatch);
//     console.log(dispatch)
//     return {
//       ...store,

//       // 覆盖上面store里的dispatch
//       dispatch
//     };
//   };
// }

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
    // return () => {};
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  const haha =  funcs.reduce((a, b) => (...args) => a(b(...args)));
  console.log(haha)
  return haha
}
