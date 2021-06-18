import React ,{useContext,useEffect,useState}from 'react';
import { MyCTX } from "../utils/appCTx";

function UseContextPage(props) {
    const ctx = useContext(MyCTX)
    console.log(ctx)
    return (
        <div className={ctx.themeColor}>
            UseContextPage ---- {ctx.themeColor}
        </div> 
    );
}

export default UseContextPage;