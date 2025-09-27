import { useState } from 'react';
import style from './Feedback.module.css';
import full from './assets/full.png';
import empty from './assets/empty.png';
import fetchData from '../../utils/fetcher';
import {useEffect} from 'react';


export default function Feedback() {
    const [selectedStar, setSelectedStar] = useState(0);
    const [name, setName] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [review, setReview] = useState(null);
    const [err, setErr] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [name]);
    const StarInput = () => {
        return (
            <div className={style.starBox}>
                <img src={selectedStar > 0 ? full : empty} onClick={() => setSelectedStar(1)} alt="" />
                <img src={selectedStar > 1 ? full : empty} onClick={() => setSelectedStar(2)} alt="" />
                <img src={selectedStar > 2 ? full : empty} onClick={() => setSelectedStar(3)} alt="" />
                <img src={selectedStar > 3 ? full : empty} onClick={() => setSelectedStar(4)} alt="" />
                <img src={selectedStar > 4 ? full : empty} onClick={() => setSelectedStar(5)} alt="" />
            </div>
        )
    }
    const handleReview = async (e) => {
        e.preventDefault();
        if (selectedStar == 0) {
            setErr("Please Give stars out of 5");
            return;
        }
        let status = await fetchData('review', 'POST', { name: name, contact: mobile, rating: selectedStar, review: review });
        if (status.status) {
            alert("Thanks For Sharing Your Valuable Review With Us");
        } else {
            alert("Falid To Note Your Review with err = " + status.reason);
        }
    }
    return (
        <div className={style.container}>
            <div className={style.ribbon}></div>
            <div className={style.holder}>
                <h2>Please Give us</h2>
                <h2>feedback so we can improve</h2>
                <hr />
                <form className={style.form} onSubmit={(e) => { handleReview(e) }}>
                    <div className={style.basicHolder}>
                        <div className={style.basic}>
                            <input value={name} required type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={style.basic}>
                            <input value={mobile} required type="tel" placeholder='Enter Phone Number' onChange={(e) => setMobile(e.target.value)} />
                        </div>
                    </div>
                    <h3>Rate Us</h3>
                    <StarInput />
                    <textarea required value={review} name="" id="" rows={4} onChange={(e) => setReview(e.target.value)}></textarea>
                    {err ? <span style={{ width: "100%", color: "red" }}>{err}</span> : ''}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}