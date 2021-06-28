import React,{useEffect,useState} from 'react';
// state 中永远不要保存可以通过计算得到的值。比如说： (猜测：state 存的是写出的值，如影响 UI 的值)
// 1.从 props 传递过来的值。有时候 props 传递过来的值无法直接使用，而是要通过一定的计算后再在 UI 上展示，比如说排序。那么我们要做的就是每次用的时候，都重新排序一下，或者利用某些 cache 机制，而不是将结果直接放到 state 里。
// 2.从 URL 中读到的值。比如有时需要读取 URL 中的参数，把它作为组件的一部分状态。那么我们可以在每次需要用的时候从 URL 中读取，而不是读出来直接放到 state 里。
// 3.从 cookie、localStorage 中读取的值。通常来说，也是每次要用的时候直接去读取，而不是读出来后放到 state 里。

const UseState = () => {
    return (
        <div>
            UseState
        </div>
    );
};

export default UseState;