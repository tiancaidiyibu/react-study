import WindowSize from './pages/BasisApi/WindowSize/index'
import StateAndLifeCycle from './pages/BasisApi/1.StateAndLifeCycle/index'
import CallbackMemoCtxRef from './pages/BasisApi/2.CallbackMemoCtxRef/index'




function App() {
  return (
    <div className="App">
      <h1>Hooks</h1>
      {/* 监听窗口大小 */}
      {/* <WindowSize /> */}

      {/* 如何保存组件状态和使用生命周期 */}
      {/* <StateAndLifeCycle /> */}

      {/* 为什么要避免重复定义回调函数 */}
      <CallbackMemoCtxRef />


    </div>
  );
}

export default App;
