import React, { Component } from 'react';

class Optimization extends Component {
    render() {
        return (
            <div>
                <p>1.减少不必要的渲染，shouldComponentUpdate,pureComponent,React.memo</p>
                <p>2.数据缓存：useMemo缓存参数，useCallback缓存函数   来进行对比</p>
                <p>3.函数。对象尽量不要使用内联形式</p>
                <p>4.Router的内联函数渲染尽量使用render或者children,不要使用component（会使用react.createElement创建一个新的element进行不停的挂载卸载）</p>
                <p>5.不要滥用功能项，context（发生变化，子级元素会发生重新渲染），props。</p>
                <p>6.懒加载，对于长页列表分页加载</p>
                <p>7.减少http请求</p>
                <h3>总结：减少计算，渲染和请求</h3>
            </div>
        );
    }
}

export default Optimization;