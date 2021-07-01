import React,{useEffect,useState} from 'react';
// useEffect：执行副作用.通常来说，副作用是指一段和当前执行结果无关的代码。
// 比如说要修改函数外部的某个变量，要发起一个请求，等等。也就是说，在函数组件的当次执行过程中，useEffect 中代码的执行是不影响渲染出来的 UI 的。
// useEffect(callback, dependencies),是每次组件 render 完后判断依赖并执行
// 1.没有依赖项，则每次 render 后都会重新执行
// 2.空数组作为依赖项，则只在首次执行时触发
// React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。
// callback 返回的函数（一般用于清理工作）在下一次依赖项发生变化以及组件销毁之前执行，而传统的 componentWillUnmount 只在组件销毁时才会执行。
// useEffect 中返回的回调函数，只是清理当前执行的 Effect 本身。

// Hooks 的使用规则包括以下：
// 只能在函数组件的顶级作用域使用(就是 Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层。)
// 只能在函数组件或者其他 Hooks 中使用。
// 不能将hook放在可能的return后面。
// Hooks 的这个规则可以总结为两点：第一，所有 Hook 必须要被执行到。第二，必须按顺序执行

const UseEffect = () => {
    // 这里在每次组件执行时创建了一个新数组 
    // const todos = [{ text: 'Learn hooks.'}]; 
    // useEffect(() => { console.log('Todos changed.'); }, [todos]);


    return (
        <div>
           UseEffect
        </div>
    );
};

export default UseEffect;
