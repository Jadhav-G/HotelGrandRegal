import { useEffect, useState } from "react";
import style from "./Hamburger.module.css";

export default function Hamburger(props) {
    const [isActive, setIsActive] = useState(props.status)
    useEffect(()=>{
        setIsActive(props.status)
    });
    const trigger = ()=>{
        console.log("triggered");
        if(props.eventFunc) props.eventFunc(!isActive);
        setIsActive((prev)=>!prev);
    }
    return (
        <div className={style.container + " " + (isActive ? style.cross : "")}  onClick={trigger}>
            <div style={{backgroundColor: props.color || "black"}} className={style.top + " " +style.line}></div>
            <div style={{backgroundColor: props.color || "black"}} className={style.middle + " " +style.line}></div>
            <div style={{backgroundColor: props.color || "black"}} className={style.bottom + " " +style.line}></div>
        </div>
    );
}