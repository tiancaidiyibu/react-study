import React, { Component } from 'react';

class Key extends Component {
    render() {
        return (
            <div>
                {/* 1.标识唯一性，在协调(diff)时候进行和type一样进行同级对比是否可以复用，是否需要删除 */}
                {/* 2.fiber算法中是链表结构，不方便进行取值，但提供一个map操作，可以获得key值，更具唯一性，所以方便了操作 */}
            </div>
        );
    }
}

export default Key;