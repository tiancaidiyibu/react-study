import React,{useEffect,useState,useMemo,useLayoutEffect} from 'react';


// useMemo(fn, deps);
// 这个场景应该很容易理解：如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算。

// useMemo 还有一个很重要的好处：避免子组件的重复渲染

// useCallback 的功能其实是可以用 useMemo 来实现的
// const myEventHandler = useMemo(() => {
//     // 返回一个函数作为缓存结果
//     return () => {
//       // 在这里进行事件处理
//     }
//   }, [dep1, dep2]);

// 从本质上来说，useMemo和useCallback它们只是做了同一件事情：建立了一个绑定某个结果到依赖数据的关系。只有当依赖变了，这个结果才需要被重新得到


function UseMemo(props) {
    const [users, setUsers] = useState(null); 
    const [searchKey, setSearchKey] = useState("");

    useLayoutEffect(() => { 
        const doFetch = async () => { 
            // 组件首次加载时发请求获取用户数据 
            const res = await fetch("https://reqres.in/api/users/"); 
            setUsers(await res.json()); 
        }; 
        doFetch(); 
    }, []); 

    // let usersToShow = null; 
    // if (users) { 
    //     // 无论组件为何刷新，这里一定会对数组做一次过滤的操作 
    //     usersToShow = users.data.filter((user) => 
    //         user.first_name.includes(searchKey), 
    //     ); 
    // }
    const usersToShow = useMemo(()=>{
        if(!users) return null
        return users.data.filter((user) => 
            user.first_name.includes(searchKey), 
        ); 
    },[users,searchKey])
    
    return (
        <div>
            <input  type="text"  value={searchKey}  onChange={(evt) => setSearchKey(evt.target.value)}   />      
            <ul>        
                {usersToShow &&          
                    usersToShow.length > 0 &&          
                    usersToShow.map((user) => {            
                        return <li key={user.id}>{user.first_name}</li>;          
                    })
                }     
            </ul>    
        </div>
    )
}

export default UseMemo;
