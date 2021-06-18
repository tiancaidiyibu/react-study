import React, {Component} from "react";
import {ThemeContext} from "../ThemeContext";

class ContextTypePage extends Component {
  // static contextType = ThemeContext;
  render() {
    console.log("this", this); 
    // this.context在任何生命周期都可以访问到
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    );
  }
}
// 只能订阅一个context 并且是类组件,如果订阅多个，后面会覆盖前面的
ContextTypePage.contextType = ThemeContext;
export default ContextTypePage;
