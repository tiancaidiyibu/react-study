import React ,{useState}from 'react';
import ReactRudexPage from './Page//ReactRudexPage/ReactRudexPage'
import RouterPage from './Page/RouterPage/RouterPage'
import RouteChildren from './Page/RouterPage/RouteChildren'



function App(props) {
  return (
    <div>
      {/* <ReactRudexPage msg={'msg'}/> */}
      <RouterPage />
      {/* <RouteChildren /> */}
    </div>
  );
}

export default App;