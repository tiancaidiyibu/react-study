
import {PLACEMENT} from './CONST'

// 下⼀个子任务
let nextUnitOfWork = null;
// 工作中的fiber root
let wipRoot = null
// 现在的根节点
let currentRoot = null;

// 当前正在⼯作的fiber
let wipFiber = null
//指向当前的hook的index 
let hookIndex = null


function render(vnode,container){
    // console.log(vnode) 
    // 根节点初始化
    wipRoot={
        node:container, // 当前的真是节点dom
        props:{children:[vnode]},
        base: currentRoot //老的tree,更新时候进行对比
    }
    nextUnitOfWork=wipRoot
    // vnode->node
    // const node = createNode(vnode,container)
    // container.appendChild(node)

}
function createNode(vnode,parentNode){
    const {type, props} = vnode
    let node =null
    if(type === "TEXT"){
        node = document.createTextNode("");
    }else if(type){
        node = document.createElement(type)
    }
    updateNode(node,props)
    return node
}

function reconcilerChildren (workInProgressFiber,children){
    // 构建fiber结构
    // 数组遍历
    // 更更新 删除 新增
    // console.log(workInProgressFiber)
    let prevSibling = null
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
    for(let i = 0;i<children.length;i++){
        let child = children[i]

        let newFiber = null
        newFiber = {
            type:child.type, //类型
            props:child.props,  //属性参数
            node:null, //真实node节点
            base:null,  //存储fiber,便于比较
            parent:workInProgressFiber, //父节点
            effectTag: PLACEMENT,
        }
        if(oldFiber){
            console.log(111)
            oldFiber = oldFiber.sibling  
        }
        if(i===0){
            workInProgressFiber.child = newFiber
        }else{
            prevSibling.sibling = newFiber
        }
        prevSibling=newFiber
        
    }
    // console.log(workInProgressFiber)
}
// 更新节点上的属性 例如className,nodeValue
function updateNode(node,nextVal){
    Object.keys(nextVal)
    .filter(k=>k!=='children')
    .forEach(k=>{
        if(k.slice(0,2)==='on'){
            let eventName =k.slice(2).toLocaleLowerCase();
            node.addEventListener(eventName,nextVal[k])
        }else{
            // 可以添加属性是因为，真是dom也是一个对象
        node[k]=nextVal[k]

        }
        
    })
}

function updateFunctionComponent (fiber){
    //当前的fiber
    wipFiber = fiber
    wipFiber.hooks = []
    hookIndex = 0
    const {type, props} = fiber
    const children = [type(props)]
    reconcilerChildren(fiber,children)
}
function updateClassComponent (fiber){
    const {type, props} = fiber
    const cmp = new type(props)
    const children = [cmp.render()]
    reconcilerChildren(fiber,children)
}

function updateHostComponent (fiber){
    if(!fiber.node){
        fiber.node = createNode(fiber)
    }
    const { children }  = fiber.props
    reconcilerChildren(fiber,children)
}
function updateFragmentComponent(fiber) {
    const {children} = fiber.props;
    reconcilerChildren(fiber, children);
}

function performUnitOfWork(fiber){
    // 执行当前任务
    // 更新当前 todo
    const { type } = fiber
    if(typeof type === 'function'){
        type.isReactComponent ?  updateClassComponent(fiber) : updateFunctionComponent(fiber)
    }else if (type){
        updateHostComponent(fiber);
    }else {
        updateFragmentComponent(fiber);
    }
    
    console.log(fiber)
    // 返回下一个子任务
    // 找下个任务的原则:先找⼦子元素
    if(fiber.child){
        return fiber.child
    }
    // 如果没有⼦子元素，寻找兄弟元素
    let nextFiber = fiber;
    while(nextFiber){
        if (nextFiber.sibling) { 
            return nextFiber.sibling;
        }
        //如果没有下一个兄弟元素，则返回父元素
        nextFiber = nextFiber.parent
    }
}

function workLoop(deadline){
    // 执行子任务
    // 返回下一个子任务
    // 。。。
    while(nextUnitOfWork&&deadline.timeRemaining() > 1){
        // 有下⼀一个任务，并且当前帧还没有结束
        // 执行子任务
        nextUnitOfWork=performUnitOfWork(nextUnitOfWork)
    }
    // 没有子任务了并且wipRoot存在
    if(!nextUnitOfWork&&wipRoot){
        // 提交
        commitRoot();
    }
    
}

requestIdleCallback(workLoop) //window.requestIdleCallback浏览器空闲时间段执行

function commitRoot (){
    commitWorker(wipRoot.child);
    currentRoot = wipRoot
    wipRoot = null;
}
function commitWorker(fiber){
    if(!fiber){
        return;
    }
    // 向上查找
    let parentNodeFiber = fiber.parent;
    console.log('parentNodeFiber',parentNodeFiber)
    while (!parentNodeFiber.node) {
        parentNodeFiber = parentNodeFiber.parent;
    }
    const parentNode = parentNodeFiber.node
    if(fiber.effectTag===PLACEMENT&&fiber.node !== null){
        parentNode.appendChild(fiber.node)
    }
    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}


export function useState(init){
    //新旧状态
    const oldhook = wipFiber.base && wipFiber.base.hooks[hookIndex]
    const hook = {
        state : oldhook?oldhook.state:init,
        queue:[]
    }
    const actions = oldhook ? oldhook.queue :[]
    actions.forEach(action=>{
        hook.state = action
    })
    const setState = (action)=>{
        hook.queue.push(action)
        wipRoot = {
            node:currentRoot.node,
            props:currentRoot.props,
            base:currentRoot
        }
        nextUnitOfWork = wipRoot
    }
    wipFiber.hooks.push(hook)
    hookIndex++;
    return [hook.state,setState]
}  


export default {
    render
}