import { useState } from 'react';
import style from './Navbar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar(){
    const crntBtn = (path)=>{
        switch(path){
            case '/':
                return '1';
            case '/content':
                return '2';
            case '/booking':
                return '3';
            case '/feedback':
                return '4';
            case '/enquiry':
                return '5';
            default:
                return '0';
        }
    }; 

    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(crntBtn(location.pathname));

    useEffect(()=>{
        setSelected(crntBtn(location.pathname));
    }, [location.pathname]);
    
    return (
        <nav className={style.navbar}>
            <span className={style.header}>Admin Panel</span>
            <ul className={style.ul}>
                <li className={selected == '1' ? style.selected : ''} onClick={()=>{ setSelected('1'); navigate('/')}}>Dashboard</li>
                <li className={selected == '2' ? style.selected : ''} onClick={()=>{ setSelected('2'); navigate('/content')}}>Content</li>
                <li className={selected == '3' ? style.selected : ''} onClick={()=>{ setSelected('3'); navigate('/bookings')}}>Bookings</li>
                <li className={selected == '4' ? style.selected : ''} onClick={()=>{ setSelected('4'); navigate('/feedback')}}>Feedback</li>
                <li className={selected == '5' ? style.selected : ''} onClick={()=>{ setSelected('5'); navigate('/enquiry')}}>Enquiries</li>
            </ul>
        </nav>
    );
}