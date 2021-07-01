import React ,{useEffect,useState,useCallback} from 'react';

// const useAsync = (asyncFunction)=>{
//      // 设置三个异步逻辑相关的 state  
//      const [data, setData] = useState(null);  
//      const [loading, setLoading] = useState(false);  
//      const [error, setError] = useState(null);
//      const execute = useCallback(()=>{
//         setData(null)
//         setLoading(true)
//         setError(null)
//         asyncFunction().then((res)=>{
//             setData(res)
//             setLoading(false)
//         })
//         .catch((err)=>{
//             setError(true)
//             setLoading(false)
//         })
//      },[asyncFunction])
//      return {
//         data,loading,error,execute
//      }
// }

// const getPosition = () => {  return {    x: document.body.scrollLeft,    y: document.body.scrollTop,  };};
// const useScroll = ()=>{
//     const [position, setPosition] = useState(getPosition());
//     useEffect(()=>{
//         const handler = ()=>{
//             setPosition(getPosition(document))
//         }
//         document.addEventListener('scroll',handler)
//         return ()=>{
//             document.removeEventListener('scroll',handler)
//         }
//     },[])
//     return position
// }

const UseHooks = () => {
    // const {data:users,loading,error,execute:fetchUsers} = useAsync(async()=>{
    //     const res = await fetch("https://reqres.in/api/users/")
    //     const json = await res.json()
    //     return json.data
    // })

    // const { y } = useScroll();
    // const goTop = useCallback(() => {    document.body.scrollTop = 0;  }, []);
    // const style = {    position: "fixed",    right: "10px",    bottom: "10px",  };

    return (
        <div>
            {/* <div className="user-list">      
                <button onClick={fetchUsers} disabled={loading}>        
                    {loading ? "Loading..." : "Show Users"}      
                </button>      
                {error &&<div style={{ color: "red" }}>Failed: {String(error)}</div>}      
                <br />      
                <ul>        
                    {users && users.length > 0 &&          
                        users.map((user) => {            
                            return <li key={user.id}>{user.first_name}</li>;          
                        })
                    }      
                </ul>    
            </div> */}


            {/* {y>300 && <button onClick = {goTop} style={style}    > 返回顶部 </button> || null} */}

        </div>
    );
};

export default UseHooks;

