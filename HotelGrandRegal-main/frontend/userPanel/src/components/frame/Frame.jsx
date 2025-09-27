import style from './Frame.module.css';

export default function Frame({img, color, isInvert = false}){
    const theme = {
        "--bgColor" : color || "#4f4040"
    }
    return (
        <div className={style.frame} style={theme}>
            <div className={`${style.div} ${isInvert ? style.top1: style.top2}`}></div>
            <div className={`${style.div} ${isInvert ? style.bottom1: style.bottom2}`}></div>
            <img className={style.img} src={img} alt="" />
        </div>
    );
}