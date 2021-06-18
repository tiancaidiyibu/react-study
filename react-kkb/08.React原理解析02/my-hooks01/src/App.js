import React from 'react';
import logo from './logo.svg';
import './App.css';
import HookPage from "./pages//HookPage";
import WriteHook from "./pages//WriteHook";
import UseMemoPage from "./pages//UseMemoPage";
import UseCallBack from "./pages/UseCallBack";
// import UseReducerPage from "./pages/UseReducerPage";
import UseContextPage from "./pages/UseContextPage";


import { MyCTX } from "./utils/appCTx";


function App() {
  return (
    <div className="App">
      111
      {/* <HookPage /> */}
      {/* <WriteHook /> */}
      {/* <UseMemoPage /> */}
      <UseCallBack />


      {/* <UseReducerPage  /> */}

      
      {/* <MyCTX.Provider value = {{themeColor:'red'}}>
        < UseContextPage />
      </MyCTX.Provider> */}
      

    </div>
  );
}

export default App;
