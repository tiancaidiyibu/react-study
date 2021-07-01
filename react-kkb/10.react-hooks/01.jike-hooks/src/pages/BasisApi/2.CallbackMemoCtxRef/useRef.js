import React,{useState,useRef,useCallback} from 'react';

// useRef 的 API :  
// const myRefContainer = useRef(initialValue);
// 把 useRef 看作是在函数组件之外创建的一个容器空间。在这个容器上，我们可以通过唯一的 current 属设置一个值，从而在函数组件的多次渲染之间共享这个值。
// 使用 useRef 保存的数据一般是和 UI 的渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染的，这也是 useRef 区别于 useState 的地方.

// 除了存储跨渲染的数据之外，useRef 还有一个重要的功能，就是保存某个 DOM 节点的引用。


// 自定义一个hook可以模拟class组件中的constructor的初始化数据
const  useConstructor =(cb) => {
    // 用一个 called ref 标记 callback 是否执行过
    const called = useRef(false)
    if(called.current)return
    // 第一次调用时直接执行
    cb()
    // 如果被调用过就标记true
    called.current = true;
}

function UseRef() {



    // 1.设计定时器，保存数据
    // 定义 time state 用于保存计时的累积时间 
    const [time, setTime] = useState(0);
    // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
    const timer = useRef(null)

    const handleStart = useCallback(()=>{
        timer.current = window.setInterval(()=>{
            setTime((time)=>time+1)
        },100)
    },[])
    const handlePause = useCallback(()=>{
        window.clearInterval(timer.current)
        timer.current = null
    },[])



    //2.dom节点操作 
    const inputEl = useRef(null);
    const onButtonClick = ()=>{
        // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
        inputEl.current.focus()
    }

    // 使用自定义hook来初始化参数
    useConstructor(()=>{
        console.log('这段代码只执行一次')
    })
    
    return (
        <div>
            {/* {time/10} 秒
            <br />
            <button onClick = {handleStart}>开始</button>
            <button onClick = {handlePause}>结束</button> */}


            {/* <input ref={inputEl} type="text" />      
            <button onClick={onButtonClick}>Focus the input</button> */}

            
        </div>
    );
}

export default UseRef;