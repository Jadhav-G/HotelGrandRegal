import { createPortal } from "react-dom";
import style from './Popup.module.css';

export default function Popup({ component, onClose }) {
  return createPortal(
    <div className={style.overlay}>
      <div className={style.popup}>
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={style.content}>{component()}</div>
      </div>
    </div>,
    document.body
  );
}
