import React from "react";
import ContextPage from "./pages/ContextPage";
import ReduxPage from "./pages/ReduxPage";

// function f1(arg) {
//   console.log("f1", arg);
//   return arg; 
// }
// function f2(arg) {
//   console.log("f2", arg);
//   return arg; 
// }
// function f3(arg) {
//   console.log("f3", arg);
//   return arg; 
// }



// function compose(...funcs) {

//   // const haha =  funcs.reduce((a, b) => (...args) => a(b(...args)));
//   const haha = funcs.reduce((prev,cur)=>{
//     return function (...args){
//       return prev(cur(...args))
//     }
//   })
//   console.log(haha)
//   return haha
// }
// console.log(compose(f1,f2,f3)('omg'))




function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>context和Redux及其源码的学习</h1>
      {/* context 上下文 */}
      {/* <ContextPage /> */}

      {/* Redux学习 */}
      <ReduxPage />
    </div>
  );
}

export default App;
