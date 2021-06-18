// import React, {useState,useCallback} from 'react';


// const UseCallBack = () => {
//     const [count,setCount] = useState(0)
//     const [value,setValue] = useState('')

//     const addCount = useCallback(()=>{
//         console.log('计算')
//         let sum =0
//         for(let i=0 ;i<count;i++){
//             sum += i
            
//         }
//         return sum
//     },[count])
//     // const addCount = () =>{
//     //     let sum =0
//     //     for(let i=0 ;i<count;i++){
//     //         sum += i
//     //     }
//     //     return sum
//     // }

//     return (
//         <div>
//             UseCallBack
//             <p>{count}</p>
//             <button onClick={()=>setCount(count+1)}>add</button>
//             <input value={value} onChange={(e)=>setValue(e.target.value)} ></input>
//             <Child addCount={addCount}></Child>
//         </div>
//     );
// };

// export default UseCallBack;

import React, { Component } from 'react';




class UseCallBack extends Component {
    constructor(props){
        super(props)
        this.state = {
            count:1
        }
    }
    render() {
        console.log('UseCallBack')
        console.log(this.key)
        return (
            <div>
                <Child />
                <div>UseCallBack</div>
                <p>{this.state.count}</p>
                <button onClick={()=>{this.setState({count:this.state.count+1})}}>add</button>
                
                <Child2></Child2>
            </div>
        );
    }
}

export default UseCallBack;



class Child extends Component {
    constructor(props){
        super(props)
        this.state = {
            num:1
        }
    }
    render() {
        console.log('child')
        return (
            <div>
                <div>Child</div>
                <p>{this.state.num}</p>
                <button onClick={()=>{this.setState({count:this.state.num+1})}}>addNum</button>
                <Son></Son>
            </div>
        );
    }
}
class Child2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            num2:1
        }
    }
    render() {
        console.log('child2')
        return (
            <div>
                <div>Child2</div>
                <p>{this.state.num2}</p>
                <button onClick={()=>{this.setState({count:this.state.num2+1})}}>addNum2</button>
            </div>
        );
    }
}

class Son extends Component {
    render() {
        console.log('Son')
        return (
            <div>
                <div>Son</div>
            </div>
        );
    }
}
