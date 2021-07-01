import React,{useEffect,useState,useCallback} from 'react';




// useCallback(fn, deps)



function UseCallback(props) {
    const [count, setCount] = useState(0); 
    // 在每次执行的时候，实际上都会创建一个新的事件处理函数 handleIncrement
    // 不仅增加了系统的开销，更重要的是：每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染。
    // const handleIncrement = () => setCount(count + 1);

    // 只有当 count 发生变化时，才会重新创建回调函数
    const handleIncrement = useCallback(()=>setCount(count+1),[count]);
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleIncrement}>+</button>
        </div>
    )
}

export default UseCallback;
