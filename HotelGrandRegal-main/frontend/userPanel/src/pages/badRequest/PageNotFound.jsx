import { useLocation, useNavigate } from "react-router-dom";
import bot from './assets/bot.png';
import { useEffect } from "react";

export default function PageNotFound(){
    const navigate = useNavigate();
    const location = useLocation();
    var old_timeout_id = null;
    var callCount = 0;
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center", fontSize:"30px", backgroundColor: "#382930cc", border: "7px solid #9e7e7e", borderRadius :"25px", width:"max-content", maxWidth:"80vw", padding:"50px", color:"#ffffff", margin:"150px auto"}}>
            <img src={bot} alt="" />
            <h1 style={{textAlign:"center"}}>Oops ! Page Not Found</h1>
            <p style={{textAlign:"center"}}>You will be redirected shortly to home page</p>
            </div>
    );
}