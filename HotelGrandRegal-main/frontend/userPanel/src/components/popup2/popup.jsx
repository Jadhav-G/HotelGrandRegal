import React, { useRef, useEffect } from 'react';
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

export function popup(Component, props, parent = null) {
    let containerStyle = {
        left : '0px',
        top : '0px',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        background : 'rgba(0,0,0,0.3)',
        backdropFilter : 'blur(2px)',
        position : parent ? 'absolute' : 'fixed',
        width: parent ? '100%' : '100vw',
        height: parent ? '100%' : '100vh', 
        zIndex: '99999'
    }
    const PopUp = ()=>{
        return (
            <div style={containerStyle} onClick={(e)=>{reactRoot.unmount(); document.body.removeChild(overaly)}}>
                <div onClick={(e)=>{e.stopPropagation()}}>
                    <Component {...props}/>
                </div>
            </div>
        );
    }

    const overaly = document.createElement('div');
    document.body.appendChild(overaly);
    let reactRoot = createRoot(overaly);
    if(parent){
        parent.current.style.position = 'relative';
        reactRoot.render(createPortal(<PopUp />, parent.current));
    }else{
        reactRoot.render(createPortal(<PopUp />, document.body));
    } 
}
