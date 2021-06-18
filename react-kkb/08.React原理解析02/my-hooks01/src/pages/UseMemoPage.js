import React,{useMemo,useState} from 'react';

const UseMemoPage = () => {

    const [count,setCount] = useState(0)
    const [value,setValue] = useState('')


// useMemo把创建函数和依赖数组作为参数传入usememo中，它仅仅在依赖项改变时重新计算

    // 避免除了count之外操作  重新计算
    const exp = useMemo(()=>{
        // console.log('计算')
        // return <div>1233</div>
        let sum =0
        for(let i=0 ;i<count;i++){
            sum += i
            
        }
        return sum
    },[count])

    // 当前的计算之和count有关
    // const exp = (()=>{
    //     console.log('计算')
    //     let sum  = 0;
    //     for(let i =0 ;i<count;i++){
    //         sum+=i
    //     }
    //     return sum
    // })



    return (
        <div>
            UseMemoPage
            <p>{count}</p>
            <p>exp:{exp}</p>
            <button onClick={()=>setCount(count+1)}>add</button>
            <input value={value} onChange={(e)=>setValue(e.target.value)} ></input>
            <Child exp={exp}></Child>
        </div>
    );
};

export default UseMemoPage;


class Child extends React.PureComponent {
    render() {
        console.log('child button')
        const { exp } =this.props
        return (
            <div>
                <div>Child</div>
                <button onClick={()=>console.log(exp)}>add</button>
            </div>
        );
    }
}