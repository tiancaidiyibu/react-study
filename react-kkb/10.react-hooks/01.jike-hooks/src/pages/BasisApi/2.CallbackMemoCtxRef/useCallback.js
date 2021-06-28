import React,{useEffect,useState,useCallback} from 'react';


// useCallback(fn, deps)

function UseCallback(props) {
    const [count, setCount] = useState(0); 
    const handleIncrement = useCallback(()=>setCount(count+1),[count]);
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleIncrement}>+</button>
        </div>
    )
}

export default UseCallback;
