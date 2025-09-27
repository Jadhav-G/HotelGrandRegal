import {useMediaQuery} from 'react-responsive';
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import breapkoint from '../../utils/breakpoints';
import style from './Navbar.module.css';
import Hamburger from '../hamburger/Hamburger';

import hotelLogo from '../../assets/images/hotelLogo.png';
import homeLogo from './assets/home.png';
import dineLogo from './assets/dine.png';
import hallLogo from './assets/hall.png';
import roomLogo from './assets/room.png';
import contactLogo from './assets/contact.png';


function MenuOption(props){
    const navigate = useNavigate();
    const clickBtn = (e, path)=>{
        e.preventDefault();
        navigate(path);
        props.onClose();
    };
    return (
        <ul className = {`${style.sidebar} ${props.visible ? style.visible : style.hidden}`}>
            <li>
                <a href="" onClick={(e)=>{clickBtn(e, '/About-us')}}><img src={hotelLogo} alt="" onClick={(e)=>{clickBtn(e, '/About-us')}}/> About Us</a>
            </li>
            <li>
                <a href="" onClick={(e)=>{clickBtn(e, '/Feedback')}}><img src={hotelLogo} alt="" onClick={(e)=>{clickBtn(e, '/Feedback')}}/> Feedback</a>
            </li>
            <li>
                <a href="" onClick={(e)=>{clickBtn(e, '/Gallery')}}><img src={hotelLogo} alt="" onClick={(e)=>{clickBtn(e, '/Follow-us')}}/>Gallery</a>
            </li>
        </ul>
    );
}


function NavOptions(){
    const clickBtn = (e, path)=>{
        e.preventDefault();
        navigate(path);
    };
    const isMobile = useMediaQuery({
        query : `(max-width : ${breapkoint.mobile}px)`
    });
    const isTablet = useMediaQuery({
        query : `(max-width : ${breapkoint.tablet}px)`
    });

    const crntBtn = (path)=>{
        switch(path){
            case '/':
                return '1';
            case '/Dine':
                return '2';
            case '/Rooms':
                return '3';
            case '/Banquet-hall':
                return '4';
            case '/Contact-us':
                return '5';
            return '0';
        }
    }; 

    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(crntBtn(location.pathname));
    useEffect(()=>{
        setSelected(crntBtn(location.pathname));
    }, [location.pathname]);

    const mobileView =  <ul id={style.mNavOptions}>
                            <li id=  {selected == '3' ? style.selectedM : ""}>
                                <a href="/Rooms" onClick={()=>{clickBtn(event, '/Rooms', '3')}}>
                                    <img src={roomLogo} alt="" />
                                    <h6>Rooms</h6>
                                </a>
                            </li>
                            <li id=  {selected == '4' ? style.selectedM : ""}>
                                <a href="/Banquet-hall" onClick={()=>{clickBtn(event, '/Banquet-hall', '4')}}>
                                    <img src={hallLogo} alt="" />
                                    <h6>Banquet</h6>
                                </a>
                            </li>
                            <li id=  {selected == '1' ? style.selectedM : ""}>
                                <a href="/" onClick={()=>{clickBtn(event, '/', '1')}}>
                                    <img src={homeLogo} alt="" />
                                    <h6>Home</h6>
                                </a>
                            </li>
                            <li id=  {selected == '2' ? style.selectedM : ""}> 
                                <a href="/Dine" onClick={()=>{clickBtn(event, '/Dine', '2')}}>
                                    <img src={dineLogo} alt="" />
                                    <h6>Dine</h6>
                                </a>
                            </li>
                            <li id=  {selected == '5' ? style.selectedM : ""}>
                                <a href="/Contact-us" onClick={()=>{clickBtn(event, '/Contact-us', '5')}}>
                                    <img src={contactLogo} alt="" />
                                    <h6>Contact</h6>
                                </a>
                            </li>
                        </ul>;

    const desktopView =  <ul id={isTablet ? style.tNavOptions : style.dNavOptions}>
                            <a href="/" onClick={(e)=>{clickBtn(e, '/', '1')}}><li onClick={()=>{clickBtn('/', '1')}} id=  {selected == '1' ? style.selected : ""}>Home</li></a>
                            <a href="/Dine" onClick={(e)=>{clickBtn(e, '/Dine', '2')}}><li onClick={()=>{clickBtn('/Dine', '2')}} id=  {selected == '2' ? style.selected : ""}>Dine</li></a>
                            <a href="/Rooms" onClick={(e)=>{clickBtn(e, '/Rooms', '3')}}><li onClick={()=>{clickBtn('/Rooms', '3')}} id=  {selected == '3' ? style.selected : ""}>Rooms</li></a>
                            <a href="/Banquet-hall" onClick={(e)=>{clickBtn(e, '/Banquet-hall', '4')}}><li onClick={()=>{clickBtn('/Banquet-hall', '4')}} id=  {selected == '4' ? style.selected : ""}>Banquet Hall</li></a>
                            <a href="/Contact-us" onClick={(e)=>{clickBtn(e, '/Contact-us', '5')}}><li onClick={()=>{clickBtn('/Contact-us', '5')}} id=  {selected == '5' ? style.selected : ""}>Contact Us</li></a>
                        </ul>;

    return isMobile ? mobileView : desktopView;
}

export default function Navbar(){
    const [toggleOn, setToggle] = useState(false);
    return (
        <nav id={style.navbar}>
            <img id={style.brandLogo} src={hotelLogo} alt= "Hotel Logo"/>
            <h4 id = {style.brandName}>Grand Regal</h4>
            <span id = {style.menuBtn}>
                <NavOptions />
                <Hamburger eventFunc = {setToggle} color="white" status = {toggleOn}/>
                <MenuOption visible = {toggleOn} onClose={()=>setToggle(false)}/>
            </span>
        </nav>
    );
}