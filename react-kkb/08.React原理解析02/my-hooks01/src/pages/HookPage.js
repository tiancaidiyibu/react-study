import React,{useEffect,useState} from 'react';


export default function HookPage(props) {

    // Hook只能在函数最外层条用，不能if或者循环等等调用
    // if(count){
    //     const [num,setNum] = useState(0) //报错
    // }

    const [count,setCount] = useState(0)
    const [date,setDate] = useState(new Date())

    // 相当于didmount和didupdate
    useEffect(()=>{
        // console.log(111111)
        document.title=`点击了${count}次`
    },[count])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setDate(new Date())
        },1000)
        // 相当于willUnmout
        return ()=>clearInterval(timer)
    },[])
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>setCount(count+1)}>add</button>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    );
}
