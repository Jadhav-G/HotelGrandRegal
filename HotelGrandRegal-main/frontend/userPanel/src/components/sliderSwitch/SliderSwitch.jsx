import style from './SliderSwitch.module.css';

export default function SliderSwitch({onSlide, option1, option2}) {
    return (
        <button className={style.controller} onClick={() => { setPosition((pre) => (!pre)); setTimeout(() => { setContent(position ? blog2 : blog1); setBlog(position ? img2 : img1) }, 200) }}>
            <span style={{ color: position ? "#0c0000" : "white" }}>Majestic Hall</span>
            <span style={{ color: position ? "white" : "#0c0000" }}>Royal Conference Hall</span>
            <div className={`${style.slider} ${position ? style.right : style.left}`}></div>
        </button>
    );
}