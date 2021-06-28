import React, {useState,useEffect} from 'react';
// 要在 Class 组件中使用，那应该如何做呢？其实有一个通用的机制，那就是利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。

const getSize = ()=> {
    return window.innerWidth > 1000 ? 'large' : 'small'
}
const useWindowSzie = () => {
    const [size,setSize] = useState(getSize())
    useEffect(()=>{
        const handler = ()=>{
            setSize(getSize())
        }
        window.addEventListener('resize',handler())
        return ()=>{
            window.removeEventListener('resize',handler)
        }
    },[])
    return size
}

const withWindowSize = (Comp) => {
    return (props)=>{
        const windowSize = useWindowSzie()
        return <Comp  windowSize={windowSize} {...props}> </Comp>
    }
}
class HocHooks extends React.Component{
    constructor(props){
        super(props)
    }
    render (){
        const { windowSize } = this.props
        return (
            <div>
                {windowSize}
            </div>
        )
    }
}


export default withWindowSize(HocHooks)