import React, { Component } from 'react';

class ChangeFunOrClass extends Component {
    render() {
        return (
            <div>
                <h2>函数组件与class组件怎么选择</h2>
                <p>1.hook之前的组件只是无状态组件，无副作用，用于数据展示</p>
                <p>2.class组件弊端，为什么引入hook</p>
                <ul>
                    <li>2.1组件之前复用转态逻辑很难（用到context时候组件嵌套太多，容易形成嵌套地狱），而hook可以使用自定义hook</li>
                    <li>2.2class组件中复杂组件变得难以理解，hook可以拆成更小的颗粒度</li>
                    <li>2.3难以理解class</li>
                </ul>
                <p>3.引入hook之后的函数组件发生了很多变化。可以存储和改变状态值（useState和useReducer），可以执行副作用（useEffect），还可以复用状态逻辑（自定义hook）</p>
                <p>以上问题出现使用hook</p>
            </div>
        );
    }
}

export default ChangeFunOrClass;