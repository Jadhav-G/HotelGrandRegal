import style from './StarBox.module.css';
import full from './assets/full.png';
import empty from './assets/empty.png';

export default ({ count }) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<img className={style.fullStar} src={i <= count ? full : empty} />);
    }
    return (
        <div className={style.starBox}>
            {stars}
        </div>
    )
}