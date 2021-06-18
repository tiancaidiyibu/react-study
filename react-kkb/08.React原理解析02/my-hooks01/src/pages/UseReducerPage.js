import React ,{useState,useEffect,useReducer}from 'react';



function FruitReducer(state=[],action){
    switch(action.type){
        case 'INIT':
            return [...action.payload];
        default:
            return state;
    }
}

function UseReducerPage(props) {
    const [fruits,dispatch] = useReducer(FruitReducer,[])
    useEffect(()=>{
        setTimeout(()=>{
            dispatch({type:'INIT',payload:['apple','banana']})
        },1000)
    },[])
    return (
        <div>
            UseReducerPage
            <FruitList fruits={fruits}/>
        </div>
    );
}

function FruitList(fruits) {
    console.log(fruits)
    return (<ul>{fruits.fruits.map((fruit,index)=><li key={fruit} onClick={()=>delFruit(index)}>{fruit}</li>)}</ul>)
}

export default UseReducerPage;