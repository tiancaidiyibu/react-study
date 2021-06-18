import React,{useEffect,useState} from 'react';


export default function WriteHook(props) {
    

    
    const { change,count } =useCount()

    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>change()}>add</button>
            <p>{useClock().toLocaleTimeString()}</p>
        </div>
    );
}


// 自定义hook,命名要以use开头
function useClock (){
    const [date,setDate] = useState(new Date())
    useEffect(()=>{
        const timer = setInterval(()=>{
            setDate(new Date())
        },1000)
        // 相当于willUnmout
        return ()=>clearInterval(timer)
    },[])
    return date
}

function useCount (){
    const [count,setCount] = useState(0)
    // 相当于didmount和didupdate
    const change = ()=>{
        setCount(count+1)
    }
    useEffect(()=>{
        // console.log(111111)
        document.title=`点击了${count}次`
    },[count])
    return {
        count,
        change
    }
}