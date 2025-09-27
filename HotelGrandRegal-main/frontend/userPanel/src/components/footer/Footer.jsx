import hotelLogo from '../../assets/images/hotelLogo.png';
import style from './Footer.module.css';
import fb from './assets/fb.png';
import insta from './assets/insta.png';
import x from './assets/x.png';
import wp from './assets/wp.png';
import link from './assets/link.png';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer id={style.footer}>
            <div id={style.footerContent}>
                <div id={style.brand}>
                    <img src={hotelLogo} alt="" />
                    <span>
                        Hotel Grand Regal
                    </span>
                </div>
                <div id={style.address}>
                    <span>88/7B/2A, NEAR EAGLE WAY BRIDGE, KOLHAPUR ROAD, ISLAMPUR, SANGLI-415409, MAHARASHTRA</span>
                    <hr />
                    <div>
                        <a href='https://www.facebook.com/grandregal22/'><img src={fb} alt="" /></a>
                        <a href='https://www.instagram.com/hotel_grandregal/?hl=en'><img src={insta} alt="" /></a>
                        <a href='https://www.facebook.com/grandregal22/'><img src={x} alt="" /></a>
                        <a href='https://wa.me/+919822341166'><img src={wp} alt="" /></a>
                    </div>
                    <a href='mailto:grandregal1431@gmail.com'>grandregal1431@gmail.com</a>
                    <span className={style.mob}><a href="919822341166">9822341166</a>   <a href="919850359950">| 9850359950</a></span>
                </div>
                <div className={style.quickLinksHolder}>
                    <div id={style.quickLinks}>
                        <span>
                            <img src={link} alt="" />
                            <h4>Quick Links</h4>
                        </span>
                        <ul>
                            <li><Link to="/About-Us">About Us</Link></li>
                            <li><Link to="/Gallery">Gallery</Link></li>
                            <li><Link to="/Feedback">Feedback</Link></li>
                            <li><Link to="/Contact-Us">Enquiry</Link></li>
                        </ul>
                    </div>
                    <div id={style.belives}>
                        <span>
                            <img src={link} alt="" />
                            <h4>Our Belives</h4>
                        </span>
                        <p>
                            We believe in heartfelt hospitality, unforgettable experiences, and creating a peaceful retreat where every guest feels truly valued
                        </p>
                    </div>
                </div>
            </div>
            <p id={style.copyright}>&copy; 2025 Hotel Grand Regal.  All Rights Reserved.</p>
        </footer>
    );
}