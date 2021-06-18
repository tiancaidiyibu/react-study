function createElement(type,props,...children){
    let propName;
    // console.log(...arguments)
    if(props){
        delete props.__source
        delete props.__self
    }
    if(type&&type.defaultProps){
        const defaultProps = type.defaultProps;
        console.log(defaultProps)
        for(propName in defaultProps){
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    return {
        type:type,
        props:{
            ...props,
            children : children.map(child=>{
                return typeof child === 'object'?child:createTextNode(child)
            })
        }
    }
}
function createTextNode (child) {
    return{
        type:'TEXT',
        props:{
            children:[],
            nodeValue:child
        }
    }
}
class Component {
    static isReactComponent = {}
    constructor(props){
        this.props=props
    }
}
// function Component(props){
//     this.props=props
// }
// Component.prototype.isReactComponent={}

export default {
    createElement,
    Component
}

