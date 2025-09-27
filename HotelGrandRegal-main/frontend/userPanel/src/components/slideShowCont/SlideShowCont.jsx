import { useState } from 'react';
import SlideShow from '../slideshow/SlideShow';
import style from './SlideShowCont.module.css';
import line from './assets/line.png';

export default function SlideShowCont(props){
    const content = props.content;
    const [liveContent, setLiveContent] = useState(0);
    return (
        <div className={style.holder}>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.slideShow}>
                        <SlideShow gallery = {props.gallery} event = {setLiveContent}/>
                    </div>
                    <p className={style.p}>{content[liveContent]}</p>
                    <img className={style.line} src={line} alt="" />
                </div>
            </div>
        </div>
    );
}