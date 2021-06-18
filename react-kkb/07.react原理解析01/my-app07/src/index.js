// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './Kreact/index';
import ReactDOM,{useState} from './Kreact/React-dom';



import './index.css';
class ClassCmp extends React.Component { 
  render() {
    return (
      <div className='app'>
        Hello {this.props.name} {this.props.msg}
        <button onClick={()=>{console.log('你好')}}>点击</button>
      </div>
    );
  }
}

ClassCmp.defaultProps = {
  msg: '默认父组件传来的值'
}

function FuncCmp(props){
  const [count,setCount] = useState(0)
  return <div className='border'>
            name:{props.name}
            <button   onClick={()=>setCount(count+1)} >count-{count}</button>
        </div>
}
const jsx=(
    <div className='border'>
      {/* <p className='border'>我是内容</p>
      <a href='#'>Ikki</a> */}
      <FuncCmp name="我是function组件" />
      {/* <ClassCmp name="我是class组件" /> */}
      {/* <>
        <h5>文本1</h5>
        <h5>文本2</h5>
      </> */}
      {/* {[1,2,3].map((item)=>{
        return <p key={item}>{item}</p>
      })
      } */}
    </div>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

