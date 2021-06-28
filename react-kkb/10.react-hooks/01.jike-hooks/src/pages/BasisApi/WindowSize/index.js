import React,{useState,useEffect} from 'react';


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

const WindowSize = () => {
    let size = useWindowSzie()
    if(size === 'small') return <div>small</div>
    else return <div>large</div>
};

export default WindowSize;