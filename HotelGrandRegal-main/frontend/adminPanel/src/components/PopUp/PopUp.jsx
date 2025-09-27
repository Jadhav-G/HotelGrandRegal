import style from './PopUp.module.css';
import ReactDOM from 'react-dom';

export default function PopUp(component, props, root = null) {
    console.log("atleast called", root);
    const PopupBox = 
        <div className={style.container}>
            <div className={style.exitArea}></div>
            <div className={style.popup}>
                {component(props)}
            </div>
        </div>
    if (root) {
        root.current.style.position = 'relative';
        return ReactDOM.createPortal(PopupBox, root.current);
    } else {
        return PopupBox;
    }
}