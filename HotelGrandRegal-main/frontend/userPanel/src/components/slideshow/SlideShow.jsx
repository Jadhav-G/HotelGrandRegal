import style from "./SlideShow.module.css";
import { useEffect, useState } from "react";

export default function SlideShow(props) {
    if(props.gallery && props.gallery.length < 4){
        throw new Error("You must pass minimum 4 images along with `gallery` attribute");
    }
    
    const switchTime = 5000; 
    const images = props.gallery;

    const [imgAdr, setImgAdr] = useState([images[3], images[0], images[1], images[2]]);
    const [animation, setAnimation] = useState([null, null, null, null]);
    const [tracker, setTracker] = useState(0);
    const [imgPointer, setImgPointer] = useState(3);

    useEffect(() => {
        let timer;
        props.event(0);
        setTimeout(()=>{
            setAnimation(prev=>[
                style.animateCenter,
                style.animateLeft,
                style.animateLeftZoom,
                style.animateRight
            ]);
            props.event(1);
            timer = setInterval(async() => {
                setAnimation(prev=>[
                    prev[3],
                    prev[0],
                    prev[1],
                    prev[2]
                ]);
                setTracker(prevTracker => {
                    const newTracker = (prevTracker + 1) % 4;
                    setImgPointer(prevPointer => {
                        const newPointer = (prevPointer + 1) % images.length;
                        props.event(newPointer > 1 ? newPointer - 2 : images.length + (newPointer - 2));
                        setTimeout(()=>{
                            setImgAdr(prevAdr => {
                                const newAdr = [...prevAdr];
                                newAdr[newTracker] = images[newPointer];
                                return newAdr;
                            });
                        }, 100);
                        return newPointer; 
                    });
                    return newTracker; 
                });
            }, switchTime);
        }, switchTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={style.slideshow}>
            <img className={`${style.leftImg} ${animation[0]}`} src={imgAdr[0]} alt="" />
            <img className={`${style.mainImg} ${animation[1]}`} src={imgAdr[1]} alt="" />
            <img className={`${style.rightImg} ${animation[2]}`} src={imgAdr[2]} alt="" />
            <img className={`${style.backImg} ${animation[3]}`} src={imgAdr[3]} alt="" />
        </div>
    );
}
